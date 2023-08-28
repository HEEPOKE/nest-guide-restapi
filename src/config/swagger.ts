import { DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import config from './config';
import { Host } from '../models/enum/host.enum';

const configSwagger = new DocumentBuilder()
  .setTitle('API Docs')
  .setDescription('API Docs')
  .setVersion('0.1')
  .addTag('Default', 'Default Apis')
  .addTag('Auth', 'Apis Auth')
  .addTag('Account', 'Apis Account')
  .addServer(config.LOCAL_HOST, Host.LOCAL_SERVER)
  .addServer(config.PRODUCTION_HOST, Host.PRODUCTION_SERVER)
  .build();

const authenticate = () =>
  basicAuth({
    challenge: true,
    users: {
      heepoke: config.SWAGGER_PASSWORD,
    },
  });

const swaggerConfig = {
  config: configSwagger,
  authenticate: authenticate,
};

export default swaggerConfig;
