import { sequelize } from '../config/database';
import { initUserModel, User } from './User.model';

initUserModel(sequelize);

export const db = {
  sequelize,
  User,
};
