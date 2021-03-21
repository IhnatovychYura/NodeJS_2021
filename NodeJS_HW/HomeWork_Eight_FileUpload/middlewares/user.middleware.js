const { ErrorHandler } = require('../error');
const { statusCode, statusMessages } = require('../constants');
const { UserModel } = require('../dataBase/models');
const { userValidators } = require('../validators');

module.exports = {
    isUserQueryValid: (req, res, next) => {
        try {
            const { error } = userValidators.userQueryParamsValidator.validate(req.query);

            if (error) {
                throw new ErrorHandler(error.details[0].message, statusCode.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isNewUserValid: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, statusCode.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isIdValid: (req, res, next) => {
        try {
            const { error } = userValidators.userIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(error.details[0].message, statusCode.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    existUserInDB: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { prefLang = 'en' } = req.query;

            const user = await UserModel.findOne({ email });

            if (user) {
                throw new ErrorHandler(
                    statusMessages.USER_EXISTS.messages[prefLang],
                    statusCode.BAD_REQUEST,
                    statusMessages.USER_EXISTS.customCode,
                    statusMessages.USER_EXISTS.isPublic,
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
