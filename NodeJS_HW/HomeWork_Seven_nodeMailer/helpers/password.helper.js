const bcrypt = require('bcrypt');

const { statusMessages } = require('../constants');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword, prefLang) => {
        const isPasswordEqual = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEqual) {
            throw new Error(statusMessages.WRONG_EMAIL_OR_PASSWORD[prefLang]);
        }
    },
};
