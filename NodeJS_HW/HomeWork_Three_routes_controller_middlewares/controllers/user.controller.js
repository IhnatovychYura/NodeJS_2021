const userService = require('../services/user.service');
const statusCode = require('../constants/statusCodes.enums');
const errorMessage = require('../errors/errors.messages');

module.exports = {

    getUsers: (req, res) => {
        try {
            const users = userService.findUsers(req.body);

            res.json(users);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getSingleUser: (req, res) => {
        try {
            const { userId } = req.params;
            const user = userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createUser: (req, res) => {
        try {
            userService.createUser(req.body);

            res.status(statusCode.CREATED).json(errorMessage.USER_CREATED.ua);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: (req, res) => {
        try {
            const { userId } = req.params;

            userService.deleteUser(userId);

            res.status(statusCode.NOT_FOUND).json(errorMessage.USER_DELETED.ua);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
