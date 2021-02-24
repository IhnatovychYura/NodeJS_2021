const userService = require('../services/user.service');
const errorCode = require('../constants/errorCodes.enums');

module.exports = {
    getAllUsers: (req, res) => {
        try{
            const users = userService.findUsers();

            res.json(users)
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message)
        }
    },

    getSingleUser: (req, res) => {
        const {userId} = req.params;
        const user = userService.findUserById(userId);

        res.json(user);
    },

    createUser: (req, res) => {
        userService.createUser(req.body);

        res.status(errorCode.CREATED).json('USER IS CREATED');
    },

    deleteUser: (req, res) => {
        userService.deleteUser(req.body);

        res.status(errorCode.NOT_FOUND).json('USER IS DELETED');
    }
}
