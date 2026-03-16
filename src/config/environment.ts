import dotenv from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';

dotenv.config();

type JwtExpiresIn = NonNullable<SignOptions['expiresIn']>;

const jwtExpiresIn = (process.env.JWT_EXPIRES_IN || '1d') as JwtExpiresIn;

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'mi_db',
  JWT_SECRET: process.env.JWT_SECRET || 'secret_dev',
  JWT_EXPIRES_IN: jwtExpiresIn,
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
};
