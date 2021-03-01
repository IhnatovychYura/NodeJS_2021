const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: (filterObject) => {
        return User.find(filterObject);
    },

    /**
     *
     * @param userId - this is integer ID of User which should be returned
     * @returns {Query<Document | null, Document>} - user fr
     */
    findUserById: (userId) => {
        return User.findById(userId);
    },

    createUser: (userObject) => User.create(userObject),
    // createUser: (userObject) => User.create({...userObject, gender: 'male'}),
}
