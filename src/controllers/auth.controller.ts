import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { successResponse } from '../utils/response.util';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser(name, email, password);
    successResponse(res, 201, 'Usuario registrado exitosamente', result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    successResponse(res, 200, 'Login exitoso', result);
  } catch (error) {
    next(error);
  }
};
