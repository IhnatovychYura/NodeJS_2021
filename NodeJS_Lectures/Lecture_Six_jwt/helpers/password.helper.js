const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashpassword) => {
        const isPasswordEqual = await bcrypt.compare(password, hashpassword);

        if (!isPasswordEqual) {
            throw new Error('Wrong email or password');
        }
    }
};
