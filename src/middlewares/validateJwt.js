const path = require('path');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('fs')
  .readFileSync(
    path.join(__dirname, '..', '..', 'jwt.evaluation.key'),
    { encoding: 'utf-8' },
  ).trim();

const { UNAUTHORIZED } = require('../utils/statusCode');

const Customer = require('../models/CustomerModel');

module.exports = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return next({ statusCode: UNAUTHORIZED, message: 'Token not found' });

  const payload = jwt.verify(token, SECRET_KEY, (err, result) => ({ err, result }));

  if (payload.err) {
    return next({
      statusCode: UNAUTHORIZED,
      message: payload.err,
    });
  }

  const user = await Customer.findById(payload.result.userId);
  if (!user) return next({ statusCode: UNAUTHORIZED, message: 'Invalid Token' });

  const { _id: id } = user;

  req.user = { id };

  return next();
};

// jwt expired
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJ1c2VySWQiOiI2MTk4ODUxYzY4ZWM2MThjYTNkM2Y3NjYiLCJpYXQiOjE2MzczODU1MDAsImV4cCI6MTYzNzM4ODgwMH0.
// jGLIRHILkA8F2pf7xnb5rx2H81N1RDzfE020ykHGJiI
