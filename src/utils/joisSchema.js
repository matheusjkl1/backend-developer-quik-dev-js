const Joi = require('joi');

function validateBody(body) {
  // schema para validacao dos dados na hora da criacao do usuario
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30)
      .required(),
    birthdate: Joi.string().max(10)
      .required(),
    username: Joi.string().min(3).max(30)
      .required(),
    password: Joi.string().min(3).max(30)
      .required(),
    address: Joi.string().min(3)
      .required(),
    addressNumber: Joi.string()
      .required(),
    primaryPhone: Joi.string().min(11).pattern(/^[0-9]+$/)
      .required(),
    description: Joi.string(),
  });

  const { value, error } = schema.validate(body);

  if (error) return { error: error.details[0].message };

  return value;
}
module.exports = {
  validateBody,
};
