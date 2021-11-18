/* eslint-disable no-unused-vars */
require('dotenv').config();
const md5 = require('md5');
const Customer = require('../models/CustumerModel');
const generateToken = require('../utils/generateToken');

const login = async ({ username, password: passwordUser }) => {
  const passwordMd5 = md5(passwordUser);
  const checkUserAlreadyExists = await Customer.findOne(
    { $and: { username, password: passwordMd5 } },
  );
  if (checkUserAlreadyExists) {
    const {
      _id: id, password, email, ...userWithOutPassword
    } = checkUserAlreadyExists;

    const token = generateToken(id);

    return { ...userWithOutPassword, token };
  }

  return { error: 'user_not_found' };
};

const registerUser = async ({
  name,
  username,
  birthdate,
  address,
  addressNumber,
  primaryPhone,
  description,
  password: passwordUser,
}) => {
  const passwordMd5 = md5(passwordUser);

  const modelResponse = await Customer.create({
    name,
    username,
    birthdate,
    address,
    addressNumber,
    primaryPhone,
    description,
    password: passwordMd5,
    role: 'user',
  });

  const { _doc: doc } = modelResponse;
  const { _id: id, password, ...customer } = doc;
  const token = generateToken(id);

  return { ...customer, token };
};

module.exports = {
  login,
  registerUser,
};
