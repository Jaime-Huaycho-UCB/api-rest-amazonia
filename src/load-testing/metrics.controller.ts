import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { MetricsService } from './metrics.service';

class ScenarioDto {
  name: string;
  action: 'open' | 'close';
}

@Controller()
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('health')
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      activeScenario: this.metricsService.getActiveScenario(),
    };
  }

  @Get('metrics')
  getMetrics() {
    return this.metricsService.getMetrics();
  }

  @Post('metrics/reset')
  @HttpCode(200)
  resetMetrics() {
    this.metricsService.resetMetrics();
    return { message: 'Metrics reset successfully' };
  }

  @Post('metrics/scenario')
  @HttpCode(200)
  setScenario(@Body() dto: ScenarioDto) {
    if (dto.action === 'open') {
      this.metricsService.setScenario(dto.name);
    } else if (dto.action === 'close') {
      this.metricsService.closeScenario(dto.name);
    }
    return {
      message: `Scenario '${dto.name}' ${dto.action}ed`,
      activeScenario: this.metricsService.getActiveScenario(),
    };
  }
}
