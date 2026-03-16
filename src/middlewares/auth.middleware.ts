import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { db } from '../models';
import { ApiError } from './error.middleware';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      throw new ApiError(401, 'Token inválido o expirado');
    }

    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      throw new ApiError(401, 'Usuario no encontrado');
    }

    (req as any).user = { id: user.id };
    next();
  } catch (error) {
    next(error);
  }
};
