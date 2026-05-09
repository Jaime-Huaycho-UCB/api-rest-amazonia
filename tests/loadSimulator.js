'use strict';

const http = require('http');
const https = require('https');
const { URL } = require('url');

// ─── Config ───────────────────────────────────────────────────────────────────
const BASE_URL = process.argv[2] || 'http://localhost:3000';
const SCENARIO_ARG = (
  process.argv.find((a) => a.startsWith('--scenario=')) || '--scenario=all'
).split('=')[1];

// Set your JWT token here if any endpoint requires auth
const AUTH_TOKEN = '';

// Endpoints to rotate during load test.
// Add more as your project grows (e.g. GET /api/products, POST /api/orders).
const ENDPOINTS = [
  { method: 'GET', path: '/api/health', requiresAuth: false },
  { method: 'GET', path: '/api/metrics', requiresAuth: false },
];

const SCENARIOS = {
  low:  { name: 'low',  users: 3,  durationMs: 15_000, thinkTimeMs: 1500 },
  avg:  { name: 'avg',  users: 10, durationMs: 20_000, thinkTimeMs: 500  },
  peak: { name: 'peak', users: 40, durationMs: 15_000, thinkTimeMs: 100  },
};

// ─── HTTP helper ──────────────────────────────────────────────────────────────
function request(method, urlStr, body) {
  return new Promise((resolve) => {
    const parsed = new URL(urlStr);
    const lib = parsed.protocol === 'https:' ? https : http;
    const payload = body ? JSON.stringify(body) : null;

    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        ...(AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {}),
      },
    };

    const req = lib.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve({ statusCode: res.statusCode }));
    });

    req.on('error', () => resolve({ statusCode: 0 }));
    req.setTimeout(10_000, () => { req.destroy(); resolve({ statusCode: 0 }); });
    if (payload) req.write(payload);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Virtual user ─────────────────────────────────────────────────────────────
async function virtualUser(scenario) {
  const endAt = Date.now() + scenario.durationMs;
  let count = 0;

  while (Date.now() < endAt) {
    const ep = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)];
    await request(ep.method, BASE_URL + ep.path);
    count++;
    // Add up to 30% jitter so all virtual users don't fire simultaneously
    const jitter = Math.floor(Math.random() * scenario.thinkTimeMs * 0.3);
    await sleep(scenario.thinkTimeMs - jitter);
  }

  return count;
}

// ─── Run one scenario ─────────────────────────────────────────────────────────
async function runScenario(scenario) {
  console.log(`\n  ▶ ${scenario.name.toUpperCase()} — ${scenario.users} users | ${scenario.durationMs / 1000}s | ${scenario.thinkTimeMs}ms think time`);

  await request('POST', `${BASE_URL}/api/metrics/scenario`, { name: scenario.name, action: 'open' });

  const results = await Promise.all(
    Array.from({ length: scenario.users }, () => virtualUser(scenario)),
  );

  await request('POST', `${BASE_URL}/api/metrics/scenario`, { name: scenario.name, action: 'close' });

  const total = results.reduce((a, b) => a + b, 0);
  console.log(`  ✔ Done — ${total} total requests sent`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\nLoad Simulator — ${BASE_URL}`);

  const health = await request('GET', `${BASE_URL}/api/health`);
  if (health.statusCode === 0) {
    console.error('\nERROR: Server unreachable. Start the server with:\n  ENABLE_LOAD_TEST=true npm run start:dev\n');
    process.exit(1);
  }

  const toRun =
    SCENARIO_ARG === 'all'
      ? [SCENARIOS.low, SCENARIOS.avg, SCENARIOS.peak]
      : [SCENARIOS[SCENARIO_ARG]].filter(Boolean);

  if (!toRun.length) {
    console.error(`Unknown scenario "${SCENARIO_ARG}". Choose: low | avg | peak | all`);
    process.exit(1);
  }

  for (let i = 0; i < toRun.length; i++) {
    await runScenario(toRun[i]);
    if (i < toRun.length - 1) {
      console.log('  Pausing 3s...');
      await sleep(3_000);
    }
  }

  console.log('\nSimulation complete.\n');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
