import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TrafficInterceptorMiddleware } from './traffic-interceptor.middleware';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class LoadTestingModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TrafficInterceptorMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
