import User from '../models/User.js';

export const findByEmail = async (email) => {
  return User.findOne({ email: email.toLowerCase() });
};

export const createUser = async ({ email, password }) => {
  return User.create({ email, password });
};

export const findUserById = async (id) => {
  return User.findById(id);
};
