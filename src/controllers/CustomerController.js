const rescue = require('express-rescue');

const {
  CREATED, OK, NO_CONTENT, NOT_FOUND, BAD_REQUEST, CONFLICT,
} = require('../utils/statusCode');
const {
  registerCustomer,
  loginCustomer,
  updateCustomer,
  deleteCustomerById,
  getCostumerById,
} = require('../services/customerService');

const RegisterCustomer = (rescue(async (req, res, next) => {
  const customer = await registerCustomer(req.body);

  if (!customer) {
    return next({
      statusCode: BAD_REQUEST,
      message: 'error_when_registering',
    });
  }

  if (customer.error === 'already_registered_user') {
    return next({
      statusCode: CONFLICT,
      message: customer.error,
    });
  }

  if (customer.error) {
    return next({
      statusCode: CONFLICT,
      message: customer.error,
    });
  }

  return res.status(CREATED).json(customer);
}));

const UpdateCostumer = (rescue(async (req, res, next) => {
  const { id } = req.user;

  const customer = await updateCustomer(id, req.body);

  if (customer.error === 'incorret_data_form') {
    return next({
      statusCode: BAD_REQUEST,
      message: customer.error,
    });
  }
  if (customer.error) {
    return next({
      statusCode: NOT_FOUND,
      message: 'not_found',
    });
  }

  return res.status(OK).json(customer);
}));

const DeleteCostumer = (rescue(async (req, res, next) => {
  const { id } = req.params;

  const customer = await deleteCustomerById(id);

  if (customer.error === 'id_invalid') {
    return next({
      statusCode: BAD_REQUEST,
      message: customer.error,
    });
  }

  if (customer.error === 'no_registered_customer') {
    return next({
      statusCode: NOT_FOUND,
      message: customer.error,
    });
  }

  return res.status(NO_CONTENT).json();
}));

const FindCostumerById = (rescue(async (req, res, next) => {
  const { id } = req.params;
  const customer = await getCostumerById(id);

  if (!customer) {
    return next({
      statusCode: NOT_FOUND,
      message: 'not_found',
    });
  }

  return res.status(OK).json(customer);
}));

const LoginCustomer = (rescue(async (req, res, next) => {
  const customer = await loginCustomer(req.body);

  if (!customer) {
    return next({
      statusCode: NOT_FOUND,
      message: 'not_found',
    });
  }

  return res.status(OK).json(customer);
}));

module.exports = {
  RegisterCustomer,
  UpdateCostumer,
  DeleteCostumer,
  LoginCustomer,
  FindCostumerById,
};
