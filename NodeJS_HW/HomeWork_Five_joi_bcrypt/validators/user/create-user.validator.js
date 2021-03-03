const Joi = require('joi');

const { constants, regexpEnum } = require('../../constants');
const { createCarValidator } = require('../car');

module.exports = Joi.object({
    login: Joi.string().alphanum().min(2).max(50),
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEXP).required(),
    yearOfBorn: Joi.number().integer().min(constants.CURRENT_YEAR - 100).max(constants.CURRENT_YEAR),
    cars: createCarValidator
});
