import { db } from '../models';
import { ApiError } from '../middlewares/error.middleware';

export const getUserProfile = async (userId: number) => {
  const user = await db.User.findByPk(userId, {
    attributes: { exclude: ['password'] },
  });
  if (!user) throw new ApiError(404, 'Usuario no encontrado');
  return user;
};

export const updateUser = async (userId: number, updateData: { name?: string; email?: string }) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new ApiError(404, 'Usuario no encontrado');

  if (updateData.email && updateData.email !== user.email) {
    const existing = await db.User.findOne({ where: { email: updateData.email } });
    if (existing) throw new ApiError(409, 'El email ya está en uso');
  }

  await user.update(updateData);
  return user;
};
