const { statusCode } = require('../constants');
const { errorMessage } = require('../errors/errors.messages');
const { userValidators } = require('../validators');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;

            if (userId.length !== 24) {
                throw new Error(errorMessage.NOT_VALID_ID.ua);
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
};
