const jwt = require('jsonwebtoken');

const { statusCode, statusMessages, constants } = require('../constants');
const { UserModel } = require('../dataBase/models');
const { JWT_SECRET } = require('../configs/config');
const { O_AuthModel } = require('../dataBase/models');

module.exports = {
    existUserInDBforAuth: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { prefLang = 'en' } = req.query;

            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error(statusMessages.WRONG_EMAIL_OR_PASSWORD[prefLang]);
            }

            req.foundUser = user;
            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);
            const { prefLang = 'en' } = req.query;

            console.log(process.env);

            if (!access_token) {
                throw new Error(statusMessages.TOKEN_REQUIRE[prefLang]);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error(statusMessages.NOT_VALID_TOKEN_VERIF[prefLang]);
                }
            });

            const tokens = await O_AuthModel.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error(statusMessages.NOT_VALID_TOKEN_DB[prefLang]);
            }

            console.log(access_token);

            req.userFromToken = tokens._user_id;

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
