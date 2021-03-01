const User = require('../dataBase/models/User');
const errorMessage = require('../errors/errors.messages');

module.exports = {
    findUsers: (userQuery) => {
        return User.find(userQuery);
    },

    findUserById: (userId) => {
        return User.findById(userId);
    },

    createUser: (userObject) => {
        ///// Як робити перевірку чи email вже існує в Mongo DB????? /////
        // let userEmail = userObject.email
        // let findUser = User.find({ email: userEmail });
        //
        // if (findUser[0].email === userEmail) {
        //     throw new Error(errorMessage.USER_EXISTS['ua']);
        // }

        return User.create(userObject);
    },

    deleteUser: (userId) => {
        return User.findByIdAndRemove(userId);
    }
}
