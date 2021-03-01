const userService = require('../services/user.service');
const statusCode = require('../constants/statusCodes.enums');
const errorMessage = require('../errors/errors.messages');

module.exports = {

    getUsers: async (req, res) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const {userId} = req.params;
            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);

            res.status(statusCode.CREATED).json(errorMessage.USER_CREATED['ua']);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {userId} = req.params;

           await userService.deleteUser(userId);

            res.status(statusCode.NOT_FOUND).json(errorMessage.USER_DELETED['ua']);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
}
