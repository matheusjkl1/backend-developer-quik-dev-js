const path = require('path');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('fs')
  .readFileSync(
    path.join(__dirname, '..', '..', 'jwt.evaluation.key'),
    { encoding: 'utf-8' },
  ).trim();

const { UNAUTHORIZED } = require('../utils/statusCode');

const Customer = require('../models/CustumerModel');

module.exports = async (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next({ statusCode: UNAUTHORIZED, message: 'Token not found' });

  const payload = jwt.verify(token, SECRET_KEY);
  const user = await Customer.findById(payload.userId);

  if (!user) return next({ statusCode: UNAUTHORIZED, message: 'User not found' });

  req.user = user.registrationNumber;

  return next();
};
