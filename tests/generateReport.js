'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const RESULTS_DIR = path.join(__dirname, 'results');

// ─── Fetch metrics ────────────────────────────────────────────────────────────
function fetchMetrics(urlStr) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
    const lib = parsed.protocol === 'https:' ? https : http;
    lib.get(urlStr, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Could not parse metrics JSON: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n, d = 2) { return typeof n === 'number' ? n.toFixed(d) : '—'; }

function scenarioStyle(name) {
  const map = {
    low:  { bg: '#e8f5e9', border: '#2e7d32', header: '#2e7d32' },
    avg:  { bg: '#fff8e1', border: '#f57f17', header: '#f57f17' },
    peak: { bg: '#fdecea', border: '#c62828', header: '#c62828' },
  };
  return map[name] || { bg: '#f5f5f5', border: '#555', header: '#555' };
}

// ─── HTML builder ─────────────────────────────────────────────────────────────
function buildHtml(metrics) {
  const scenarios = Object.values(metrics);

  const scenarioBlocks = scenarios.map((s) => {
    const st = scenarioStyle(s.name);
    const epRows = [...s.endpoints]
      .sort((a, b) => b.count - a.count)
      .map((ep) => `
          <tr>
            <td><code>${ep.endpoint}</code></td>
            <td>${ep.count}</td>
            <td>${fmt(ep.avgLatency)} ms</td>
            <td>${fmt(ep.minLatency)} ms</td>
            <td>${fmt(ep.maxLatency)} ms</td>
          </tr>`).join('');

    const statusRows = Object.entries(s.statusCodes)
      .map(([code, cnt]) => {
        const color = Number(code) >= 400 ? '#c62828' : '#2e7d32';
        return `<tr><td style="color:${color};font-weight:600">${code}</td><td>${cnt}</td></tr>`;
      }).join('');

    const errorColor = s.errorRate > 5 ? '#c62828' : '#2e7d32';

    return `
  <section style="margin-bottom:36px;border:2px solid ${st.border};border-radius:8px;overflow:hidden;">
    <h2 style="margin:0;padding:14px 20px;background:${st.header};color:#fff;font-size:1.2rem;letter-spacing:.5px;">
      Scenario: ${s.name.toUpperCase()}
    </h2>
    <div style="background:${st.bg};padding:20px;">

      <table class="summary">
        <tr><td>Duration</td>        <td><b>${fmt(s.durationSeconds)} s</b></td></tr>
        <tr><td>Total Requests</td>  <td><b>${s.totalRequests}</b></td></tr>
        <tr><td>RPS</td>             <td><b>${fmt(s.rps)}</b></td></tr>
        <tr><td>Avg Latency</td>     <td><b>${fmt(s.latency.avgMs)} ms</b></td></tr>
        <tr><td>Min Latency</td>     <td><b>${fmt(s.latency.minMs)} ms</b></td></tr>
        <tr><td>Max Latency</td>     <td><b>${fmt(s.latency.maxMs)} ms</b></td></tr>
        <tr><td>BW In</td>           <td><b>${fmt(s.bandwidthIn.kbps)} KB/s &nbsp;(${fmt(s.bandwidthIn.totalKB)} KB total)</b></td></tr>
        <tr><td>BW Out</td>          <td><b>${fmt(s.bandwidthOut.kbps)} KB/s &nbsp;(${fmt(s.bandwidthOut.totalKB)} KB total)</b></td></tr>
        <tr><td>Avg Heap</td>        <td><b>${fmt(s.memory.avgHeapMB)} MB</b></td></tr>
        <tr><td>DB Queries</td>      <td><b>${s.queryCount}</b></td></tr>
        <tr><td>Error Rate</td>      <td><b style="color:${errorColor}">${fmt(s.errorRate)} %</b></td></tr>
      </table>

      <h3>Status Codes</h3>
      <table style="width:auto;">
        <thead><tr><th>Status</th><th>Count</th></tr></thead>
        <tbody>${statusRows}</tbody>
      </table>

      <h3>Endpoints</h3>
      <table>
        <thead>
          <tr><th>Endpoint</th><th>Requests</th><th>Avg Latency</th><th>Min</th><th>Max</th></tr>
        </thead>
        <tbody>${epRows}</tbody>
      </table>
    </div>
  </section>`;
  }).join('');

  const totalReqs    = scenarios.reduce((s, sc) => s + sc.totalRequests, 0);
  const totalQueries = scenarios.reduce((s, sc) => s + sc.queryCount, 0);
  const avgError     = scenarios.length
    ? scenarios.reduce((s, sc) => s + sc.errorRate, 0) / scenarios.length
    : 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Load Test Report — Amazonia</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
         max-width: 980px; margin: 0 auto; padding: 24px 16px; color: #222; background: #fafafa; }
  h1   { border-bottom: 3px solid #333; padding-bottom: 10px; margin-bottom: 6px; }
  h2   { font-size: 1rem; }
  h3   { margin: 18px 0 8px; font-size: .95rem; color: #444; }
  p.ts { color: #888; font-size: .82rem; margin-bottom: 28px; }
  table { border-collapse: collapse; width: 100%; margin-bottom: 6px; font-size: .88rem; }
  th, td { border: 1px solid #ddd; padding: 7px 11px; text-align: left; }
  th   { background: #ececec; font-weight: 600; }
  tr:nth-child(even) td { background: rgba(0,0,0,.025); }
  code { font-family: monospace; font-size: .9em; background:#eee; padding:1px 4px; border-radius:3px; }
  .summary td:first-child { font-weight: 600; color: #555; width: 160px; }
  .totals { background: #fff; border: 1px solid #ddd; border-radius: 8px;
            padding: 18px 20px; margin-bottom: 32px; }
  .totals h2 { margin-top: 0; color: #333; }
</style>
</head>
<body>
<h1>Load Test Report — Amazonia API</h1>
<p class="ts">Generated: ${new Date().toISOString()}</p>

<div class="totals">
  <h2>Global Totals</h2>
  <table class="summary" style="width:auto;min-width:300px;">
    <tr><td>Scenarios Run</td>   <td><b>${scenarios.length}</b></td></tr>
    <tr><td>Total Requests</td>  <td><b>${totalReqs}</b></td></tr>
    <tr><td>Total DB Queries</td><td><b>${totalQueries}</b></td></tr>
    <tr><td>Avg Error Rate</td>  <td><b>${fmt(avgError)} %</b></td></tr>
  </table>
</div>

${scenarioBlocks}
</body>
</html>`;
}

// ─── Console summary ──────────────────────────────────────────────────────────
function printSummary(metrics) {
  console.log('\n══════════════ SUMMARY ══════════════');
  for (const s of Object.values(metrics)) {
    console.log(`\n  ${s.name.toUpperCase()}`);
    console.log(`    Requests : ${s.totalRequests}  |  RPS: ${fmt(s.rps)}`);
    console.log(`    Latency  : avg ${fmt(s.latency.avgMs)}ms  min ${fmt(s.latency.minMs)}ms  max ${fmt(s.latency.maxMs)}ms`);
    console.log(`    BW In    : ${fmt(s.bandwidthIn.kbps)} KB/s  |  BW Out: ${fmt(s.bandwidthOut.kbps)} KB/s`);
    console.log(`    Heap     : ${fmt(s.memory.avgHeapMB)} MB avg  |  DB Queries: ${s.queryCount}  |  Errors: ${fmt(s.errorRate)}%`);
  }
  console.log('\n═════════════════════════════════════\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }

  console.log(`Fetching metrics from ${BASE_URL}/api/metrics ...`);
  const metrics = await fetchMetrics(`${BASE_URL}/api/metrics`);

  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const jsonPath = path.join(RESULTS_DIR, `report_${ts}.json`);
  const htmlPath = path.join(RESULTS_DIR, `report_${ts}.html`);

  fs.writeFileSync(jsonPath, JSON.stringify(metrics, null, 2), 'utf8');
  console.log(`JSON → ${jsonPath}`);

  fs.writeFileSync(htmlPath, buildHtml(metrics), 'utf8');
  console.log(`HTML → ${htmlPath}`);

  printSummary(metrics);
}

main().catch((err) => {
  console.error('Report generation failed:', err.message);
  process.exit(1);
});
