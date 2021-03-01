const statusCode = require('../constants/statusCodes.enums');
const errorMessage = require('../errors/errors.messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const carId = req.params.carId;

            if (carId.length !== 24) {
                throw new Error(errorMessage.NOT_VALID_ID["ua"]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isNewCarValid: (req, res, next) => {
        try{
            const {model, color, price, prefLang = 'en'} = req.body;

            if (!model || !color || !price ) {
                throw new Error(errorMessage.EMPTY_FIELD['ua']);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
}
