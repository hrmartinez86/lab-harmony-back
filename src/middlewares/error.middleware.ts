import { Request, Response, NextFunction } from 'express';
import { env } from '../config/environment';

export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Error interno del servidor';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    console.error('Error no manejado:', err);
    if (env.NODE_ENV === 'development') {
      message = err.message;
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
