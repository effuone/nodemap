import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`IN`);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `${req.method.toUpperCase()} ${res.statusCode} ${req.originalUrl}`,
    );
    next();
  }
}
