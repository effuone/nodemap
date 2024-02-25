import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';
import { ConfigService } from '@nestjs/config';
import { DatabaseExceptionFilter } from './database/database.exception-filter';
import { HttpExceptionFilter } from './core/http.exception-filter';

async function bootstrap() {
  const logger = new Logger('EntryPoint');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'debug'],
  });

  const server = app.getHttpServer();
  server.setTimeout(5 * 60 * 1000);

  setupGracefulShutdown({ app });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new DatabaseExceptionFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Jaqsylyq backend API boilerplate by @alibackend')
    .setDescription('Api Docs for Jaqsylyq backend API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);

  app.enableCors({ origin: configService.get('APP_URL'), credentials: true });
  const PORT = configService.get('PORT');
  await app.listen(PORT);

  logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
