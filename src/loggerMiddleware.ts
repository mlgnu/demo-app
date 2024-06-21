import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {}

  use(req: Request, res: Response, next: any) {
    this.logger.info({
      method: req.method,
      ip: req.ip,
      statusCode: res.statusCode,
    });
    next();
  }
}
