'use strict';

const http = require('http');
const https = require('https');
const { spawn } = require('child_process');
const path = require('path');
const { URL } = require('url');

const BASE_URL = process.argv[2] || 'http://localhost:3000';

// ─── HTTP helper ──────────────────────────────────────────────────────────────
function request(method, urlStr, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
    const lib = parsed.protocol === 'https:' ? https : http;
    const payload = body ? JSON.stringify(body) : null;

    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    };

    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve({ statusCode: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ statusCode: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// Spawn a child node process and inherit its stdio
function runScript(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(process.execPath, [scriptPath, ...args], { stdio: 'inherit' });
    proc.on('close', (code) => {
      code === 0 ? resolve() : reject(new Error(`${path.basename(scriptPath)} exited with code ${code}`));
    });
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   Amazonia — Full Load Test Suite         ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log(`  Target: ${BASE_URL}\n`);

  // Verify server is reachable and load test mode is active
  const health = await request('GET', `${BASE_URL}/api/health`).catch(() => null);
  if (!health || health.statusCode !== 200) {
    console.error('ERROR: Server not reachable or ENABLE_LOAD_TEST is not set.');
    console.error('Start the server with:\n  ENABLE_LOAD_TEST=true npm run start:dev\n');
    process.exit(1);
  }
  console.log('  Server OK.\n');

  // 1. Reset any previous metrics
  console.log('[0] Resetting metrics...');
  await request('POST', `${BASE_URL}/api/metrics/reset`);

  const simulator = path.join(__dirname, 'loadSimulator.js');
  const generator = path.join(__dirname, 'generateReport.js');

  // 2. Low scenario
  console.log('\n[1/3] LOW scenario');
  await runScript(simulator, [BASE_URL, '--scenario=low']);

  console.log('  Pausing 3 s...');
  await sleep(3_000);

  // 3. Average scenario
  console.log('\n[2/3] AVERAGE scenario');
  await runScript(simulator, [BASE_URL, '--scenario=avg']);

  console.log('  Pausing 3 s...');
  await sleep(3_000);

  // 4. Peak scenario
  console.log('\n[3/3] PEAK scenario');
  await runScript(simulator, [BASE_URL, '--scenario=peak']);

  // 5. Generate report
  console.log('\n[4/4] Generating report...');
  await runScript(generator, [BASE_URL]);

  console.log('✔ Full test suite finished.\n');
}

main().catch((err) => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
