const { statusCode } = require('../constants');
const { userValidators } = require('../validators');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const { error } = userValidators.userIdValidator.validate(req.params);
            console.log(req.params);

            if (error) {
                console.log(error.details[0].message);
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
};
