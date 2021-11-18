/* eslint-disable no-unused-vars */
require('dotenv').config();
const md5 = require('md5');
const Customer = require('../models/CustomerModel');
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

  return { error: 'customer_not_found' };
};

const registerCustomer = async (customerData) => {
  if (!Object.keys(customerData).length) return false
  const {
    name,
    username,
    birthdate,
    address,
    addressNumber,
    primaryPhone,
    description,
    password: passwordUser,
  } = customerData

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

const findCostumerById = async (id) => {
  const customer = await Customer.findById(id);

  if (customer) return customer;

  return { error: 'no_registered_customer' };
}

const findAllCustomers = async () => {
  const customers = await Customer.find();

  if (customers) return customers;

  return { error: 'no_registered_customers' };
};

module.exports = {
  login,
  registerCustomer,
  findCostumerById,
  findAllCustomers,
};
