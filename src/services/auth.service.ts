import { db } from '../models';
import { generateToken } from '../utils/jwt.util';
import { ApiError } from '../middlewares/error.middleware';

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, 'El email ya está registrado');
  }

  const user = await db.User.create({ name, email, password });

  const userResponse = { id: user.id, name: user.name, email: user.email };
  const token = generateToken(user.id);

  return { user: userResponse, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(401, 'Credenciales inválidas');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Credenciales inválidas');
  }

  const userResponse = { id: user.id, name: user.name, email: user.email };
  const token = generateToken(user.id);
  return { user: userResponse, token };
};
