/* eslint-disable no-console */
const { INTERNAL_SERVER_ERROR } = require('../utils/statusCode');

module.exports = (err, _req, res, _next) => {
  console.log(err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: { message: err.message },
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Algo deu errado aqui', error: err });
};
