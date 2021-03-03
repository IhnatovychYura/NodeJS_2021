const { UserModel } = require('../dataBase/models');

module.exports = {
    findUsers: (userQuery) => UserModel.find(userQuery),

    findUserById: (userId) => UserModel.findById(userId),

    createUser: (userObject) => UserModel.create(userObject),

    deleteUser: (userId) => UserModel.findByIdAndRemove(userId)
};
