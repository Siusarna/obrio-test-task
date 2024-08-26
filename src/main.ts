import {Logger, ValidationPipe} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastify from 'fastify';

import { AppModule } from './app.module';
import { ResponseInterceptor } from "./common/middlewares/response.interceptor";
import { applyRequestLogger } from "./common/middlewares/request-log.middleware";
import { ErrorHandler } from "./common/middlewares/error-handler";

async function bootstrap() {
  const fastifyApp = fastify({
    ignoreTrailingSlash: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(fastifyApp),
      {
        bufferLogs: true,
        logger: console,
      },
  );

  app.enableCors({
    origin: '*',
    methods: 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS, TRACE',
    allowedHeaders: ['Content-Type'],
  });

  const logger = new Logger;
  app.useLogger(logger)

  applyRequestLogger(fastifyApp, logger);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
  );

  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ErrorHandler(logger));

  app.enableShutdownHooks();

  await app.listen(configService.get('port')!, '0.0.0.0', () => {
    logger.log(`Obrio started on port ${configService.get('port')!}`, 'main.ts');
  });
}
void bootstrap();
