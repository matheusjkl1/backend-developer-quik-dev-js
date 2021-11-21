const jwt = require('jsonwebtoken');
const path = require('path');

const SECRET_KEY = require('fs')
  .readFileSync(
    path.join(__dirname, '..', '..', 'jwt.evaluation.key'),
    { encoding: 'utf-8' },
  )
  .trim();

// configuracao do token, encode dele e tempo que fica disponivel para uso
module.exports = (id) => {
  const jwtConfig = {
    expiresIn: '55m',
    algorithm: 'HS256',
  };

  return jwt.sign({ userId: id }, SECRET_KEY, jwtConfig);
};
