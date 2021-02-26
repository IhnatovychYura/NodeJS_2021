const statusCode = require('../constants/statusCodes.enums');
const errorMessage = require('../errors/errors.messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errorMessage.NOT_VALID_ID["ua"]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isNewUserValid: (req, res, next) => {
        try{
            const {email, login, password, prefLang = 'en'} = req.body;

            if (!email || !login || !password ) {
                throw new Error(errorMessage.EMPTY_FIELD['ua']);
            }

            if (!email.includes('@')){
                throw new Error(errorMessage.NOT_VALID_EMAIL['ua']);
            }

            if (password.length < 6){
                throw new Error(errorMessage.TOO_WEAK_PASSWORD['ua']);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
}
