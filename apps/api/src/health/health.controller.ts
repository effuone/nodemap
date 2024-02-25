import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { Public } from 'src/auth/guards/public.decorator';
import { DatabaseHealthIndicator } from 'src/database/database.health';

@Public()
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dbHealth: DatabaseHealthIndicator,
  ) {}

  @Get('ping')
  @HealthCheck()
  ping() {
    return this.health.check([
      () => {
        return {
          pingCheck: {
            status: 'up',
          },
        };
      },
    ]);
  }

  @Get('db')
  @HealthCheck()
  async db() {
    return this.health.check([() => this.dbHealth.isHealthy()]);
  }
}
