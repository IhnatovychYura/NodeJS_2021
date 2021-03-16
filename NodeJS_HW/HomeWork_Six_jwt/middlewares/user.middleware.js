const { statusCode, statusMessages } = require('../constants');
const { UserModel } = require('../dataBase/models');
const { userValidators } = require('../validators');

module.exports = {
    isUserQueryValid: (req, res, next) => {
        try {
            const { error } = userValidators.userQueryParamsValidator.validate(req.query);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    isNewUserValid: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    isIdValid: (req, res, next) => {
        try {
            const { error } = userValidators.userIdValidator.validate(req.params);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    existUserInDB: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { prefLang = 'en' } = req.query;

            const user = await UserModel.findOne({ email });

            if (user) {
                throw new Error(statusMessages.USER_EXISTS[prefLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
