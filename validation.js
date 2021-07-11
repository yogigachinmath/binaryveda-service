const Joi = require('joi');

const signUpSchema = Joi.object().keys({
  firstName: Joi.string().trim().min(1).required(),
  lastName: Joi.string().trim().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required().label('Password'),
  confirm_password: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required(),
});

async function validateSignUpSchema(req, res, next) {
  try {
    await signUpSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next({ Error: 'Validation', msg: err.message });
  }
}
async function validateLoginSchema(req, res, next) {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next({ Error: 'Validation', msg: err.message });
  }
}

module.exports = {
  validateSignUpSchema,
  validateLoginSchema,
};
