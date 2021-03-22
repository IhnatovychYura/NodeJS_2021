const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    carId: Joi
        .string()
        .required()
        .regex(regexpEnum.ID_REGEXP)
});
