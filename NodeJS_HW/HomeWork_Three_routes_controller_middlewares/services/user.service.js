const DB = require('../dataBase/users');

const errorMessage = require('../errors/errors.messages');

module.exports = {
    findUsers: () => {
        return DB
    },

    findUserById: (userId) => {
        if(userId > DB.length - 1){
            throw new Error(errorMessage.USER_NOT_FOUND['ua']);
        }

        return DB[userId]
    },

    createUser: (userObject) => {
        let findUser = DB.some(user => user.email === userObject.email);

        if(findUser) {
            throw new Error(errorMessage.USER_EXISTS['ua']);
        }

        DB.push(userObject);
    },

    deleteUser: (userId) => {
        if(userId > DB.length - 1){
            throw new Error(errorMessage.USER_NOT_FOUND['ua']);
        }

        DB.splice(userId, 1);
    }
}
