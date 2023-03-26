import httpStatus from 'http-status';
import { UserUpdate } from '../shared/customTypes';
import UserModel from '../models/user/user.model';
import ApiError from '../utils/ApiError';

const createUser = async (user: any) => {
  return UserModel.create({
    addr: user.args[0],
    amount_A: parseInt(user.args[1].hex) / 2,
    amount_B: parseInt(user.args[1].hex) / 2,
    amount_c: parseInt(user.args[1].hex),
  });
};

const patchUser = async (user: any) => {
  const usr = await UserModel.find({ addr: user.addr });
  Object.assign(usr, {
    amount_A: parseInt(user.args[1].hex),
    amount_B: parseInt(user.args[2].hex),
    amount_c: parseInt(user.args[3].hex),
    amount_cx: parseInt(user.args[4].hex),
    amount_cy: parseInt(user.args[5].hex),
  });
  await usr.save();
  return usr;
};

const queryUsers = async (filter: any, options: any) => {
  const users = await UserModel.paginate(filter, options);
  return users;
};

const getUserById = async (id: string) => {
  UserModel.findById(id);
};

const updateUserById = async (id: string, updateBody: UserUpdate) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (id: string) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

export default {
  createUser,
  patchUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
