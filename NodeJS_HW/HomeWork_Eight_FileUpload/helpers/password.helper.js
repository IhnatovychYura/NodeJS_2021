const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../error');
const { statusMessages, statusCode } = require('../constants');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword, prefLang) => {
        const isPasswordEqual = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEqual) {
            throw new ErrorHandler(
                statusMessages.WRONG_EMAIL_OR_PASSWORD[prefLang],
                statusCode.BAD_REQUEST,
                statusMessages.WRONG_EMAIL_OR_PASSWORD.customCode,
            );
        }
    },
};
