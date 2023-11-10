import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT,
  LOCAL_HOST: process.env.LOCAL_HOST,
  PRODUCTION_HOST: process.env.PRODUCTION_HOST,
  ENDPOINT_URL: process.env.ENDPOINT_URL,
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  MIN: 0,
  MAX: 1000000,
};

export default config;
