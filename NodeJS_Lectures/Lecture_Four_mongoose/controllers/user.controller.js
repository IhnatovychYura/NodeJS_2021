const userService = require('../services/user.service');

// const User = require('../dataBase/models/User');

module.exports = {
    getAllUsers: async (req, res) => {
        try{
            const users = await userService.findUsers(req.query);

            res.json(users)
        }catch (e) {
            res.status(400).json(e.message)
        }
    },

    getSingleUser: async (req, res) => {
        const {userId} = req.params
        const user = await userService.findUserById(userId)

        res.json(user);
    },

    // це Варіант якби не було файлу сервіс, і треба було б тут в контроллері описувати функцію
    // createUser: async (req, res) => {
    //     try{
    //         await User.create({
    //             name: 'Dima',
    //             age: 22,
    //             cars: [{model: 'S', price: 9999}]
    //         })
    //
    //         res.status(201).json('USER IS CREATED');
    //     } catch (e) {
    //         res.json(e.message);
    //     }
    // },

    createUser: async (req, res) => {
        try{
            await userService.createUser(req.body);

            res.status(201).json('USER IS CREATED');
        } catch (e) {
            res.json(e.message);
        }
    },
}
