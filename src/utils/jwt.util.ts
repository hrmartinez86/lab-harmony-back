import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { env } from '../config/environment';

export const generateToken = (userId: number): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN,
  };

  return jwt.sign({ id: userId }, env.JWT_SECRET, options);
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
