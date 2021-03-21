const { passwordHasher } = require('../helpers');
const { emailActions, statusCode, statusMessages } = require('../constants');
const { mailService, userService } = require('../services');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { password, email, login } = req.body;
            const { prefLang = 'en' } = req.query;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            await mailService.sendMail(email, emailActions.WELCOME, { userName: login });

            res.status(statusCode.CREATED).json(statusMessages.USER_CREATED[prefLang]);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { password, email, login } = req.body;
            const { prefLang = 'en' } = req.query;

            const user = await userService.findUserById(userId);

            const hashPassword = await passwordHasher.hash(password);

            await userService.updateUser(userId, { ...req.body, password: hashPassword });

            await mailService.sendMail(email || user.email, emailActions.UPDATE, { userName: login || user.login });

            res.status(statusCode.CREATED).json(statusMessages.USER_WAS_UPDATE[prefLang]);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { prefLang = 'en' } = req.query;

            const user = await userService.findUserById(userId);

            await userService.deleteUser(userId);

            await mailService.sendMail(user.email, emailActions.DELETE, { userName: user.login });

            res.status(statusCode.NOT_FOUND).json(statusMessages.USER_WAS_DELETED[prefLang]);
        } catch (e) {
            next(e);
        }
    }
};
