const Joi = require('joi');

const { constants, regexpEnum } = require('../../constants');

module.exports = Joi.object({
    email: Joi
        .string()
        .regex(regexpEnum.EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required(),
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
    cars: Joi.array()
    /// // це Варіант якби в UserModel було так: cars: [{ type: Schema.Types.Mixed }],тоді тут треба так писати // ////
    //
    //     .items(
    //     Joi.object({
    //         _id: Joi.string(),
    //         color: Joi.string(),
    //         model: Joi.string(),
    //         price: Joi.number()
    //     })
    // )
});
