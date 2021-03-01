const errorCodes = require('../constants/errorCodes.enums');
const errorMessage = require('../errors/errors.messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error('Not Valid Id')
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },

    isNewUserValid: (req, res, next) => {
        try{
            const {name, password, prefLang = 'en'} = req.body;

            if (!name || !password) {
                throw new Error('Some field is empty');
            }

            if (password.length < 6){
                throw new Error(errorMessage.TOO_WEAK_PASSWORD[prefLang]);
            }

            next()

        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    }
}
