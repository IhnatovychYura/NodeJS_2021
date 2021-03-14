const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    userId: Joi
        .string()
        .required()
        .regex(regexpEnum.ID_REGEXP)
});
