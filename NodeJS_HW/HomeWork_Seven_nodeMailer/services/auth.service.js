const { O_AuthModel } = require('../dataBase/models');

module.exports = {
    createTokensForAuthUser: (tokensObject) => O_AuthModel.create(tokensObject)
};
