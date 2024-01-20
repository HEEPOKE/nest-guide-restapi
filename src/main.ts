import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import config from './config/config';
import swaggerConfig from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix('apis');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, swaggerConfig.config);
  app.use(
    ['/apis/docs'],
    basicAuth({
      challenge: true,
      users: {
        admin: '        ',
      },
    }),
  );

  SwaggerModule.setup('apis/docs', app, document, swaggerConfig.options);

  await app.listen(config.PORT);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
