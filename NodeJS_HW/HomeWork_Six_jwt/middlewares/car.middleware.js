const { statusCode } = require('../constants');
const { carValidator } = require('../validators');

module.exports = {
    isCarQueryValid: (req, res, next) => {
        try {
            const { error } = carValidator.carQueryParamsValidator.validate(req.query);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    isNewCarValid: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

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
            const { error } = carValidator.carIdValidator.validate(req.params);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
};
