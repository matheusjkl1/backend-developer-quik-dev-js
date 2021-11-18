const rescue = require('express-rescue');
const {
  CREATED, NOT_FOUND,
} = require('../utils/statusCode');
const { registerUser } = require('../services/customerService');

const Register = (rescue(async (req, res, next) => {
  const customer = await registerUser(req.body);

  if (!customer) {
    return next({
      statusCode: NOT_FOUND,
      message: 'Not Found',
    });
  }

  return res.status(CREATED).json(customer);
}));

module.exports = {
  Register,
};
