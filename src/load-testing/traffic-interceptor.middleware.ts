import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { performance } from 'perf_hooks';
import { recordRequest } from './metrics.store';

@Injectable()
export class TrafficInterceptorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const startTime = performance.now();
    const heapStart = process.memoryUsage().heapUsed;

    const contentLengthHeader = req.headers['content-length'];
    const bytesIn = contentLengthHeader
      ? parseInt(contentLengthHeader, 10)
      : req.body
        ? Buffer.byteLength(JSON.stringify(req.body))
        : 0;

    const originalEnd: (...args: any[]) => any = res.end.bind(res);

    (res as any).end = function (chunk?: any, encoding?: any, callback?: any): any {
      let bytesOut = 0;
      if (chunk) {
        if (Buffer.isBuffer(chunk)) {
          bytesOut = chunk.length;
        } else if (typeof chunk === 'string') {
          bytesOut = Buffer.byteLength(chunk, typeof encoding === 'string' ? (encoding as BufferEncoding) : 'utf8');
        }
      }

      const heapEnd = process.memoryUsage().heapUsed;
      const latency = performance.now() - startTime;
      const endpoint = `${req.method} ${req.path}`;

      recordRequest({ latency, bytesIn, bytesOut, statusCode: res.statusCode, endpoint, heapStart, heapEnd });

      return originalEnd(chunk, encoding, callback);
    };

    next();
  }
}
