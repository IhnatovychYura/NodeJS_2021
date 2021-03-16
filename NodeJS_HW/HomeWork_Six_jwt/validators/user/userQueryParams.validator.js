const Joi = require('joi');

const { regexpEnum, constants } = require('../../constants');

module.exports = Joi.object({
    prefLang: Joi
        .string(),
    email: Joi
        .string()
        .regex(regexpEnum.EMAIL_REGEXP),
    password: Joi
        .string()
        .regex(regexpEnum.PASSWORD_REGEXP),
    login: Joi
        .string()
        .alphanum()
        .min(2)
        .max(50)
        .allow('X Æ A-Xii'),
    yearOfBorn: Joi
        .number()
        .integer()
        .min(constants.CURRENT_YEAR - 100)
        .max(constants.CURRENT_YEAR),
    cars: Joi
        .boolean(),
});
