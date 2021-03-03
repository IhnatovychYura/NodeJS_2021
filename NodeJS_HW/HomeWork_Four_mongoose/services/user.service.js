const User = require('../dataBase/models/User');

module.exports = {
    findUsers: (userQuery) => User.find(userQuery),

    findUserById: (userId) => User.findById(userId),

    createUser: (userObject) => User.create(userObject),

    deleteUser: (userId) => User.findByIdAndRemove(userId)
};
