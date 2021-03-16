const jwt = require('jsonwebtoken');

const { statusCode, statusMessages, constants } = require('../constants');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');
const { O_AuthModel, UserModel } = require('../dataBase/models');

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
                    throw new Error(statusMessages.NOT_VALID_ACCESS_TOKEN[prefLang]);
                }
            });

            const tokens = await O_AuthModel.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error(statusMessages.NOT_VALID_TOKEN_DB[prefLang]);
            }

            console.log(access_token);

            req.userIdFromAccessToken = tokens._user_id;

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.REFRESH_TOKEN);
            const { prefLang = 'en' } = req.query;

            if (!refresh_token) {
                throw new Error(statusMessages.TOKEN_REQUIRE[prefLang]);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new Error(statusMessages.NOT_VALID_REFRESH_TOKEN[prefLang]);
                }
            });

            const tokens = await O_AuthModel.findOne({ refresh_token }).populate('_user_id');
            req.foundUser = tokens._user_id;
            req.tokensId = tokens._id.toString();

            if (!tokens || null) {
                throw new Error(statusMessages.NOT_VALID_TOKEN_DB[prefLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    isAuthorized: (req, res, next) => {
        try {
            const { userIdFromAccessToken } = req;
            const { userId } = req.params;
            const { prefLang = 'en' } = req.query;

            if (userId !== userIdFromAccessToken.id) {
                throw new Error(statusMessages.UNAUTHORIZED_USER[prefLang]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
};
