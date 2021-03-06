const userService = require('../services/user.service');
const { passwordHasher } = require('../helpers');

// const User = require('../dataBase/models/User');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    getSingleUser: async (req, res) => {
        const { userId } = req.params;
        const user = await userService.findUserById(userId);

        res.json(user);
    },

    createUser: async (req, res) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            res.status(201).json('USER IS CREATED');
        } catch (e) {
            res.json(e.message);
        }
    },
};
