const rescue = require('express-rescue');
const {
  CREATED, NOT_FOUND, OK, BAD_REQUEST
} = require('../utils/statusCode');
const { registerCustomer, findAllCustomers } = require('../services/customerService');

const Register = (rescue(async (req, res, next) => {

  const customer = await registerCustomer(req.body);

  // Retorno de erro improvisado apenas para que o teste nao quebre enquanto busco a solucao para testar o next
  if (!customer) {
      return res.status(BAD_REQUEST).json({ message: 'error when registering' })
  }

  // if (!customer) {
  //   return next({
  //     statusCode: BAD_REQUEST,
  //     message: 'error when registering',
  //   });
  // }

  return res.status(CREATED).json(customer);
}));

const FindCostumerById = (rescue(async (req, res, next) => {
  const { id } = req.body
  const customer = await findById(id);

  if (!customer) {
    return next({
      statusCode: NOT_FOUND,
      message: 'Not Found',
    });
  }

  return res.status(OK).json(customer);
}));

const FindAllCostumers = (rescue(async (_req, res, next) => {
  const customer = await findAllCustomers();

  if (!customer) {
    return next({
      statusCode: NOT_FOUND,
      message: 'Not Found',
    });
  }

  return res.status(OK).json(customer);
}));

module.exports = {
  Register,
  FindAllCostumers,
  FindCostumerById,
};
