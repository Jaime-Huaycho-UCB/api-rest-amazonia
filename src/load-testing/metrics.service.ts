import { Injectable } from '@nestjs/common';
import {
  setScenario,
  closeScenario,
  getMetrics,
  resetMetrics,
  getActiveScenario,
  ScenarioSummary,
} from './metrics.store';

@Injectable()
export class MetricsService {
  setScenario(name: string): void {
    setScenario(name);
  }

  closeScenario(name: string): void {
    closeScenario(name);
  }

  getMetrics(): Record<string, ScenarioSummary> {
    return getMetrics();
  }

  resetMetrics(): void {
    resetMetrics();
  }

  getActiveScenario(): string | null {
    return getActiveScenario();
  }
}
