const { O_AuthModel } = require('../dataBase/models');

module.exports = {
    createTokensForAuthUser: (tokensObject) => O_AuthModel.create(tokensObject),
    createNewTokensForAuthUser: (tokensObject) => O_AuthModel.create(tokensObject),
    deleteExpTokens: (tokensId) => O_AuthModel.findByIdAndDelete(tokensId),
    updateTokensById: (tokensId, updateObject) => O_AuthModel.findByIdAndUpdate(tokensId, updateObject),
};
