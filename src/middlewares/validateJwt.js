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

  // faz a busca do usuario para validar se o token pertence a um usuario cadastrado.
  const user = await Customer.findById(payload.result.userId);

  if (!user) return next({ statusCode: UNAUTHORIZED, message: 'Invalid Token' });

  const { _id: id } = user;

  req.user = { id };
  // retorna o token para o proximo middleware
  return next();
};
