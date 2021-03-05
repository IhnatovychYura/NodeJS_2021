const { UserModel, oAuthModel } = require('../dataBase/models');
const { passwordHasher, tokenizer } = require('../helpers');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error('NO USER');
            }

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();

            await oAuthModel.create({ ...tokens, _user_id: user._id });

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }
};
