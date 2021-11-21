/* eslint-disable no-unused-vars */
require('dotenv').config();
const { ObjectId } = require('mongodb');
const md5 = require('md5');
const Customer = require('../models/CustomerModel');
const generateToken = require('../utils/generateToken');
const { validateBody } = require('../utils/joisSchema');

const registerCustomer = async (customerData) => {
  if (!Object.keys(customerData).length) return false;

  const isValid = validateBody(customerData);

  if (isValid.error) return { error: isValid.error };

  const {
    name,
    username,
    birthdate,
    address,
    addressNumber,
    primaryPhone,
    description,
    password: passwordUser,
  } = customerData;

  const passwordMd5 = md5(passwordUser);

  const checkUserAlreadyExists = await Customer.findUserByUsername({ username });

  if (checkUserAlreadyExists) {
    return { error: 'already_registered_user' };
  }

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

  const { id, ...customer } = modelResponse;

  const token = generateToken(id);

  return { ...customer, id, token };
};

// const getCostumerById = async (id) => {
//   const customer = await Customer.findById(ObjectId(id));

//   if (!customer) return { error: 'no_registered_customer' };

//   return customer;
// };

const loginCustomer = async ({ username, password: passwordUser }) => {
  if (!username || !passwordUser) return { error: 'incorret_data_form' };

  const passwordMd5 = md5(passwordUser);

  const checkUserAlreadyExists = await Customer.findUser({ username, password: passwordMd5 });

  if (checkUserAlreadyExists) {
    const { _id: id, password, ...customer } = checkUserAlreadyExists;

    const token = generateToken(id);

    return { ...customer, id, token };
  }

  return { error: 'customer_not_found' };
};

const updateCustomer = async (id, dataToUpdate) => {
  if (!Object.keys(dataToUpdate).length) return { error: 'incorret_data_form' };

  const customerUpdate = await Customer.findByIdAndUpdate(id, dataToUpdate);

  if (!customerUpdate) return { error: 'no_registered_customer' };

  return customerUpdate;
};

const deleteCustomerById = async (id) => {
  if (!ObjectId.isValid(id)) return { error: 'id_invalid' };

  const customerDelete = await Customer.deleteCustomer(ObjectId(id));

  if (!customerDelete.value) return { error: 'no_registered_customer' };

  return { message: 'successfully_deleted' };
};

module.exports = {
  loginCustomer,
  registerCustomer,
  // getCostumerById,
  updateCustomer,
  deleteCustomerById,
};
