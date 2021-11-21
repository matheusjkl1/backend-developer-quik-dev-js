/* eslint-disable no-unused-vars */
require('dotenv').config();
const { ObjectId } = require('mongodb');
const md5 = require('md5');
const Customer = require('../models/CustomerModel');
const generateToken = require('../utils/generateToken');
const { validateBody } = require('../utils/joisSchema');

const registerCustomer = async (customerData) => {
  if (!Object.keys(customerData).length) return false;

  // schema de validacao de campos obrigatorios
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

  // encriptacao da senha
  const passwordMd5 = md5(passwordUser);

  // valida se o usuario existe para nao duplicar dados no banco
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

  // gera um token utilizando o novo id registrado
  const token = generateToken(id);

  return { ...customer, id, token };
};

const getCostumerById = async (id) => {
  if (!ObjectId.isValid(id)) return { error: 'id_invalid' };
  const customer = await Customer.findById(ObjectId(id));

  if (!customer) return { error: 'no_registered_customer' };

  const {
    _id,
    name,
    birthdate,
    address,
    addressNumber,
    primaryPhone,
    description,
    createdAt,
  } = customer;

  return {
    _id, name, birthdate, address, addressNumber, primaryPhone, description, createdAt,
  };
};

const loginCustomer = async ({ username, password: passwordUser }) => {
  if (!username || !passwordUser) return { error: 'incorret_data_form' };

  // encripta a senha para consulta no banco de dados
  const passwordMd5 = md5(passwordUser);

  const checkUserAlreadyExists = await Customer.findUser({ username, password: passwordMd5 });

  if (checkUserAlreadyExists) {
    // remove a senha do objeto de retorno para nao expor dados sensiveis
    const { _id: id, password, ...customer } = checkUserAlreadyExists;

    //  gera um token para o usuario logado utilizando seu id
    const token = generateToken(id);

    return { ...customer, id, token };
  }

  return { error: 'customer_not_found' };
};

const updateCustomer = async (id, dataToUpdate) => {
  if (!Object.keys(dataToUpdate).length) return { error: 'incorret_data_form' };

  const customerUpdate = await Customer.findByIdAndUpdate(id, dataToUpdate);

  if (!customerUpdate) return { error: 'no_registered_customer' };

  // retorna o id e os novos dados atualizados
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
  getCostumerById,
  updateCustomer,
  deleteCustomerById,
};
