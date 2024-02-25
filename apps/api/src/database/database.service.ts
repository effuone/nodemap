import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    this.$on('error', ({ message }) => {
      this.logger.error(message);
    });
    this.$on('warn', ({ message }) => {
      this.logger.warn(message);
    });
    this.$on('info', ({ message }) => {
      this.logger.debug(message);
    });
    this.$on('query', ({ query, params, duration }) => {
      this.logger.verbose(`[${duration} ms] ${query}; ${params}`);
    });

    await this.$connect();
  }
}
