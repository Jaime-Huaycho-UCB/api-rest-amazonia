import { performance } from 'perf_hooks';

export interface RequestRecord {
  timestamp: number;
  latency: number;
  bytesIn: number;
  bytesOut: number;
  statusCode: number;
  endpoint: string;
  heapDelta: number;
}

export interface EndpointStats {
  count: number;
  totalLatency: number;
  minLatency: number;
  maxLatency: number;
}

export interface ScenarioData {
  name: string;
  startTime: number;
  endTime: number | null;
  requests: RequestRecord[];
  queryCount: number;
  statusCodes: Record<number, number>;
  endpoints: Record<string, EndpointStats>;
  heapSnapshots: number[];
}

export interface EndpointSummary {
  endpoint: string;
  count: number;
  avgLatency: number;
  minLatency: number;
  maxLatency: number;
}

export interface ScenarioSummary {
  name: string;
  durationSeconds: number;
  totalRequests: number;
  rps: number;
  bandwidthIn: { totalKB: number; kbps: number };
  bandwidthOut: { totalKB: number; kbps: number };
  latency: { avgMs: number; minMs: number; maxMs: number };
  memory: { avgHeapMB: number };
  queryCount: number;
  statusCodes: Record<number, number>;
  errorRate: number;
  endpoints: EndpointSummary[];
}

interface InternalStore {
  scenarios: Record<string, ScenarioData>;
  activeScenario: string | null;
}

const store: InternalStore = {
  scenarios: {},
  activeScenario: null,
};

export function setScenario(name: string): void {
  if (!store.scenarios[name]) {
    store.scenarios[name] = {
      name,
      startTime: performance.now(),
      endTime: null,
      requests: [],
      queryCount: 0,
      statusCodes: {},
      endpoints: {},
      heapSnapshots: [],
    };
  }
  store.activeScenario = name;
}

export function closeScenario(name: string): void {
  if (store.scenarios[name] && store.scenarios[name].endTime === null) {
    store.scenarios[name].endTime = performance.now();
  }
  if (store.activeScenario === name) {
    store.activeScenario = null;
  }
}

export function recordRequest(data: {
  latency: number;
  bytesIn: number;
  bytesOut: number;
  statusCode: number;
  endpoint: string;
  heapStart: number;
  heapEnd: number;
}): void {
  const scenario = store.activeScenario ? store.scenarios[store.activeScenario] : null;
  if (!scenario) return;

  scenario.requests.push({
    timestamp: Date.now(),
    latency: data.latency,
    bytesIn: data.bytesIn,
    bytesOut: data.bytesOut,
    statusCode: data.statusCode,
    endpoint: data.endpoint,
    heapDelta: data.heapEnd - data.heapStart,
  });

  scenario.heapSnapshots.push(data.heapEnd);
  scenario.statusCodes[data.statusCode] = (scenario.statusCodes[data.statusCode] || 0) + 1;

  if (!scenario.endpoints[data.endpoint]) {
    scenario.endpoints[data.endpoint] = {
      count: 0,
      totalLatency: 0,
      minLatency: Infinity,
      maxLatency: -Infinity,
    };
  }
  const ep = scenario.endpoints[data.endpoint];
  ep.count++;
  ep.totalLatency += data.latency;
  if (data.latency < ep.minLatency) ep.minLatency = data.latency;
  if (data.latency > ep.maxLatency) ep.maxLatency = data.latency;
}

export function incrementQueryCount(): void {
  if (store.activeScenario && store.scenarios[store.activeScenario]) {
    store.scenarios[store.activeScenario].queryCount++;
  }
}

export function getMetrics(): Record<string, ScenarioSummary> {
  const result: Record<string, ScenarioSummary> = {};

  for (const [name, scenario] of Object.entries(store.scenarios)) {
    const reqs = scenario.requests;
    const duration =
      scenario.endTime !== null
        ? (scenario.endTime - scenario.startTime) / 1000
        : (performance.now() - scenario.startTime) / 1000;

    const totalBytesIn = reqs.reduce((s, r) => s + r.bytesIn, 0);
    const totalBytesOut = reqs.reduce((s, r) => s + r.bytesOut, 0);
    const latencies = reqs.map((r) => r.latency);
    const sumLatency = latencies.reduce((a, b) => a + b, 0);
    const avgLatency = latencies.length ? sumLatency / latencies.length : 0;
    const minLatency = latencies.length ? Math.min(...latencies) : 0;
    const maxLatency = latencies.length ? Math.max(...latencies) : 0;
    const errorCount = reqs.filter((r) => r.statusCode >= 400).length;
    const sumHeap = scenario.heapSnapshots.reduce((a, b) => a + b, 0);
    const avgHeap = scenario.heapSnapshots.length ? sumHeap / scenario.heapSnapshots.length : 0;

    result[name] = {
      name,
      durationSeconds: duration,
      totalRequests: reqs.length,
      rps: duration > 0 ? reqs.length / duration : 0,
      bandwidthIn: {
        totalKB: totalBytesIn / 1024,
        kbps: duration > 0 ? totalBytesIn / 1024 / duration : 0,
      },
      bandwidthOut: {
        totalKB: totalBytesOut / 1024,
        kbps: duration > 0 ? totalBytesOut / 1024 / duration : 0,
      },
      latency: { avgMs: avgLatency, minMs: minLatency, maxMs: maxLatency },
      memory: { avgHeapMB: avgHeap / 1024 / 1024 },
      queryCount: scenario.queryCount,
      statusCodes: scenario.statusCodes,
      errorRate: reqs.length > 0 ? (errorCount / reqs.length) * 100 : 0,
      endpoints: Object.entries(scenario.endpoints).map(([ep, data]) => ({
        endpoint: ep,
        count: data.count,
        avgLatency: data.count ? data.totalLatency / data.count : 0,
        minLatency: isFinite(data.minLatency) ? data.minLatency : 0,
        maxLatency: isFinite(data.maxLatency) ? data.maxLatency : 0,
      })),
    };
  }

  return result;
}

export function resetMetrics(): void {
  store.scenarios = {};
  store.activeScenario = null;
}

export function getActiveScenario(): string | null {
  return store.activeScenario;
}
