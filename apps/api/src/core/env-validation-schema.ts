import * as Joi from 'joi';

export interface EnvironmentVariables {
  DATABASE_URL: string;

  PORT: number;
  APP_URL: string;

  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  REDIS_HOST: string;
  REDIS_PORT: string;

  JWT_KEY: string;
  HASH_PASSWORD_KEY: string;

  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRATION_IN_DAYS: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRATION_IN_DAYS: string;
}

export const envValidationSchema = Joi.object<EnvironmentVariables, true>({
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().required(),
  APP_URL: Joi.string().required(),

  REDIS_USERNAME: Joi.string().allow(''),
  REDIS_PASSWORD: Joi.string().allow(''),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),

  JWT_KEY: Joi.string().required(),
  HASH_PASSWORD_KEY: Joi.string().required(),

  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_IN_DAYS: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRATION_IN_DAYS: Joi.string().required(),
});
