const { statusCode } = require('../constants');
const { carValidator } = require('../validators');
const { ErrorHandler } = require('../error');

module.exports = {
    isCarQueryValid: (req, res, next) => {
        try {
            const { error } = carValidator.carQueryParamsValidator.validate(req.query);

            if (error) {
                throw new ErrorHandler(error.details[0].message, statusCode.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isNewCarValid: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

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
            const { error } = carValidator.carIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(error.details[0].message, statusCode.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
