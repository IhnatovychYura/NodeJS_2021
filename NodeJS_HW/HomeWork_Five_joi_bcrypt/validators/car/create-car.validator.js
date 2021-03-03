const Joi = require('joi');

module.exports = Joi.array().items(
    Joi.object({
        model: Joi.string(),
        color: Joi.string(),
        price: Joi.number()
    })
);
