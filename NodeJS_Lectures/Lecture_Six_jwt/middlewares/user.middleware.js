const { errorCodes } = require('../constants');
const { userValidators } = require('../validators');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const { error } = userValidators.userIdValidator.validate(req.params);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
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
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
