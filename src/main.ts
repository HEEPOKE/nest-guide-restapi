import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
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
  app.use('apis/docs', swaggerConfig.authenticate);

  SwaggerModule.setup('apis/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      filter: true,
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });

  await app.listen(config.PORT);
}
bootstrap();
