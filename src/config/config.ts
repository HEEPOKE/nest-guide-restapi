import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT,
  LOCAL_HOST: process.env.LOCAL_HOST,
  PRODUCTION_HOST: process.env.PRODUCTION_HOST,
  ENDPOINT_URL: process.env.ENDPOINT_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  EXPIRE_IN: process.env.EXPIRE_IN,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  API_KEY: process.env.API_KEY,
  MIN: 0,
  MAX: 1000000,
};

const globalConfig = () => ({
  PORT: process.env.PORT,
  LOCAL_HOST: process.env.LOCAL_HOST,
  PRODUCTION_HOST: process.env.PRODUCTION_HOST,
  ENDPOINT_URL: process.env.ENDPOINT_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  EXPIRE_IN: process.env.EXPIRE_IN,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  API_KEY: process.env.API_KEY,
  MIN: 0,
  MAX: 1000000,
});

export { config, globalConfig };
