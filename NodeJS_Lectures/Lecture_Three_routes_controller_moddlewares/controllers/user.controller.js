const userService = require('../services/user.service');

module.exports = {
    getAllUsers: (req, res) => {
        try{
            const users = userService.findUsers();

            res.json(users)
        }catch (e) {
            res.status(400).json(e.message)
        }
    },

    getSingleUser: (req, res) => {
        const {userId} = req.params
        const user = userService.findUserById(userId)

        res.json(user);
    },

    createUser: (req, res) => {
        userService.createUser(req.body);

        res.status(201).json('USER IS CREATED');
    },
}
