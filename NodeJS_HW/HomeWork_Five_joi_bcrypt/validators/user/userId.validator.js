const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    userId: Joi
        .string()
        .required()
        .regex(regexpEnum.USERID_REGEXP)
});
