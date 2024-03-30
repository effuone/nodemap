import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './core/env-validation-schema';
import { LoggerMiddleware } from './core/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggingHttpModule } from './core/http.logging-module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GracefulShutdownModule.forRoot({ gracefulShutdownTimeout: 10000 }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    HealthModule,
    AuthModule,
    AuthModule,
    UserModule,
    LoggingHttpModule,
    DatabaseModule,
    JwtModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
