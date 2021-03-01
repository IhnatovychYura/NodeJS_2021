const User = require('../dataBase/models/User');

module.exports = {
    findUsers: (userQuery) => {
        return User.find(userQuery);
    },

    findUserById: (userId) => {
        return User.findById(userId);
    },

    createUser: (userObject) => {
        return User.create(userObject);
    },

    deleteUser: (userId) => {
        return User.findByIdAndRemove(userId);
    }
}
