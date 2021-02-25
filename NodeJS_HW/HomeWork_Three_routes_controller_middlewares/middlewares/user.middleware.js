const errorCodes = require('../constants/errorCodes.enums');

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
            const {email, login, password, prefLang = 'en'} = req.body;

            if (!email || !login || !password ) {
                throw new Error('Some field is empty');
            }

            if (password.length < 6){
                throw new Error(errorMessage.TOO_WEAK_PASSWORD[prefLang]);
            }

            if (!email.includes('@')){
                throw new Error('Not valid email')
            }

            next()

        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    }
}
