const { passwordHasher } = require('../helpers');
const { statusCode, statusMessages } = require('../constants');
const { userService } = require('../services');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const { password } = req.body;
            const { prefLang = 'en' } = req.query;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            res.status(statusCode.CREATED).json(statusMessages.USER_CREATED[prefLang]);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { userFromToken } = req;
            const { userId } = req.params;
            const { password } = req.body;
            const { prefLang = 'en' } = req.query;

            if (userId !== userFromToken.id) {
                throw new Error(statusMessages.UNAUTHORIZED_USER[prefLang]);
            }

            const hashPassword = await passwordHasher.hash(password);

            await userService.updateUser(userId, { ...req.body, password: hashPassword });

            res.status(statusCode.CREATED).json(statusMessages.USER_WAS_UPDATE[prefLang]);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userFromToken } = req;
            const { userId } = req.params;
            const { prefLang = 'en' } = req.query;

            if (userId !== userFromToken.id) {
                throw new Error(statusMessages.UNAUTHORIZED_USER[prefLang]);
            }

            await userService.deleteUser(userId);

            res.status(statusCode.NOT_FOUND).json(statusMessages.USER_WAS_DELETED[prefLang]);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
