import * as Joi from 'joi';
import { EnviromentEnum } from 'src/shared/enums/enviroment.enum';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid(EnviromentEnum.DEVELOPMENT, EnviromentEnum.PRODUCTION, EnviromentEnum.TEST, EnviromentEnum.DEBUG)
        .default(EnviromentEnum.DEVELOPMENT),
    PORT: Joi.number().default(3000),
    DOMAIN_FRONTEND: Joi.string().default('*'),

    DB_TYPE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_LOGS: Joi.boolean().default(false),

    ACTIVE_JWT: Joi.boolean().default(true),
    JWT_SECRET: Joi.string().required(),
    JWT_TIME_EXPIRE: Joi.string().default('24h'),

    SEED_SUPERADMIN_EMAIL: Joi.string().email({ tlds: { allow: false } }).optional(),
    SEED_SUPERADMIN_PASSWORD: Joi.string().min(8).optional(),
});
