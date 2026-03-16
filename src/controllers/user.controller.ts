import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { successResponse } from '../utils/response.util';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const user = await userService.getUserProfile(userId);
    successResponse(res, 200, 'Perfil obtenido', user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { name, email } = req.body;
    const updatedUser = await userService.updateUser(userId, { name, email });
    successResponse(res, 200, 'Perfil actualizado', updatedUser);
  } catch (error) {
    next(error);
  }
};
