const jwt = require('jsonwebtoken');

const { oAuthModel } = require('../dataBase/models');
const { JWT_SECRET } = require('../configs/config');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');
            // const { userId } = req.params();  // не завди є юзерІД

            console.log(process.env);

            if (!access_token) {
                throw new Error('Token is required');
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error('Not valid token');
                }
            });

            const tokens = await oAuthModel.findOne({ access_token }).populate('_user_id ');

            if (!tokens) {
                throw new Error('Not valid token');
            }

            console.log(access_token);

            req.user = tokens._user_id;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
