const { authService } = require('../services');
const { passwordHasher, tokenizer } = require('../helpers');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { foundUser } = req;
            const { password } = req.body;
            const { prefLang = 'en' } = req.query;

            await passwordHasher.compare(password, foundUser.password, prefLang);

            const tokens = tokenizer();

            await authService.createTokensForAuthUser({ ...tokens, _user_id: foundUser._id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
    createNewTokens: async (req, res, next) => {
        try {
            const { foundUserId } = req;
            const { tokensId } = req;

            const tokens = tokenizer();

            await authService.updateTokensById(tokensId, { ...tokens, foundUserId });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
