const { statusCode } = require('../constants');
const { authService } = require('../services');
const { passwordHasher, tokenizer } = require('../helpers');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { foundUser } = req;
            const { password } = req.body;
            const { prefLang = 'en' } = req.query;

            await passwordHasher.compare(password, foundUser.password, prefLang);

            const tokens = tokenizer();

            await authService.createTokensForAuthUser({ ...tokens, _user_id: foundUser._id });

            res.json(tokens);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    createNewTokens: async (req, res) => {
        try {
            const { foundUser } = req;
            const { tokensId } = req;

            const tokens = tokenizer();

            await authService.deleteExpTokens(tokensId);
            await authService.createNewTokensForAuthUser({ ...tokens, _user_id: foundUser.id });

            res.json(tokens);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
