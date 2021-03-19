const jwt = require('jsonwebtoken');

const { ErrorHandler } = require('../error');
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
                throw new ErrorHandler(
                    statusMessages.WRONG_EMAIL_OR_PASSWORD.message[prefLang],
                    statusCode.BAD_REQUEST,
                    statusMessages.WRONG_EMAIL_OR_PASSWORD.customCode
                );
            }

            req.foundUser = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);
            const { prefLang = 'en' } = req.query;

            if (!access_token) {
                throw new ErrorHandler(
                    statusMessages.TOKEN_REQUIRE.message[prefLang],
                    statusCode.BAD_REQUEST,
                    statusMessages.TOKEN_REQUIRE.customCode,
                );
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(
                        statusMessages.NOT_VALID_ACCESS_TOKEN.message[prefLang],
                        statusCode.UNAUTHORIZED,
                        statusMessages.NOT_VALID_ACCESS_TOKEN.customCode,
                    );
                }
            });

            const tokens = await O_AuthModel.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new ErrorHandler(
                    statusMessages.NOT_VALID_TOKEN_DB.message[prefLang],
                    statusCode.NOT_FOUND,
                    statusMessages.NOT_VALID_TOKEN_DB.customCode,
                );
            }

            console.log(access_token);

            req.userIdFromAccessToken = tokens._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.REFRESH_TOKEN);
            const { prefLang = 'en' } = req.query;

            if (!refresh_token) {
                throw new ErrorHandler(
                    statusMessages.TOKEN_REQUIRE.message[prefLang],
                    statusCode.BAD_REQUEST,
                    statusMessages.TOKEN_REQUIRE.customCode,
                );
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(
                        statusMessages.NOT_VALID_REFRESH_TOKEN.message[prefLang],
                        statusCode.UNAUTHORIZED,
                        statusMessages.NOT_VALID_REFRESH_TOKEN.customCode,
                    );
                }
            });

            const tokens = await O_AuthModel.findOne({ refresh_token });
            req.foundUserId = tokens._user_id;
            req.tokensId = tokens._id.toString();

            if (!tokens || null) {
                throw new ErrorHandler(
                    statusMessages.NOT_VALID_TOKEN_DB.message[prefLang],
                    statusCode.NOT_FOUND,
                    statusMessages.NOT_VALID_TOKEN_DB.customCode,
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isAuthorized: (req, res, next) => {
        try {
            const { userIdFromAccessToken } = req;
            const { userId } = req.params;
            const { prefLang = 'en' } = req.query;

            if (userId !== userIdFromAccessToken.id) {
                throw new ErrorHandler(
                    statusMessages.UNAUTHORIZED_USER.message[prefLang],
                    statusCode.UNAUTHORIZED,
                    statusMessages.UNAUTHORIZED_USER.customCode,
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
