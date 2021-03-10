const { userService } = require('../services');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
};
