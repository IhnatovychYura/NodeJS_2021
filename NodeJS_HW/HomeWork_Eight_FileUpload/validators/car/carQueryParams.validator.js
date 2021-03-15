const Joi = require('joi');

module.exports = Joi.object({
    prefLang: Joi
        .string(),
    color: Joi
        .string(),
    model: Joi
        .string(),
    price: Joi
        .number()
        .min(0),
});
