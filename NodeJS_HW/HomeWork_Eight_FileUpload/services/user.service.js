const { UserModel } = require('../dataBase/models');
require('../dataBase/models/Car');

module.exports = {
    createUser: (userObject) => UserModel.create(userObject),
    deleteUser: (userId) => UserModel.findByIdAndDelete(userId),
    findUsers: (filterObject) => UserModel.find(filterObject),
    findUserById: (userId) => UserModel.findById(userId),
    updateUser: (userId, newUserObject) => UserModel.findByIdAndUpdate(userId, { $set: newUserObject })
};
