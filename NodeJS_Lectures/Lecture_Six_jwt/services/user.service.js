const { UserModel } = require('../dataBase/models');

require('../dataBase/models/Car');

module.exports = {
    findUsers: (filterObject) => UserModel.find(filterObject),

    /**
     *
     * @param userId - this is integer ID of User which should be returned
     * @returns {Query<Document | null, Document>} - user fr
     */
    findUserById: (userId) => UserModel.findById(userId),

    createUser: (userObject) => UserModel.create(userObject),
    // createUser: (userObject) => User.create({...userObject, gender: 'male'}),
};
