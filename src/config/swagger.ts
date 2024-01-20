import { DocumentBuilder } from '@nestjs/swagger';
import config from './config';
import { Host } from '../models/enum/host.enum';

const configSwagger = new DocumentBuilder()
  .setTitle('API Docs')
  .setDescription('API Docs')
  .setContact(
    'contact to me',
    'https://github.com/HEEPOKE',
    'https://github.com/HEEPOKE',
  )
  .setLicense('', '')
  .setTermsOfService('https://github.com/HEEPOKE')
  .setVersion('0.1')
  .addTag('Default', 'Default Apis')
  .addTag('Auth', 'Apis Auth')
  .addTag('Account', 'Apis Account')
  .addServer(config.LOCAL_HOST, Host.LOCAL_SERVER)
  .addServer(config.PRODUCTION_HOST, Host.PRODUCTION_SERVER)
  .addApiKey()
  .addBearerAuth()
  .build();

const options = {
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
      apiKeyAuth: {
        type: 'apiKey',
        name: 'api_key',
        in: 'header',
      },
    },
    security: [{ bearerAuth: [] }, { apiKeyAuth: [] }],
    ignoreGlobalPrefix: false,
  },
};

const swaggerConfig = {
  config: configSwagger,
  options,
};

export default swaggerConfig;
