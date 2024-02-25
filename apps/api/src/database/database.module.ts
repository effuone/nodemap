import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseHealthIndicator } from './database.health';

@Global()
@Module({
  providers: [DatabaseService, DatabaseHealthIndicator],
  exports: [DatabaseService, DatabaseHealthIndicator],
})
export class DatabaseModule {}
