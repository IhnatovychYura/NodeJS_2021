const { UserModel } = require('../dataBase/models');

require('../dataBase/models/Car');

module.exports = {
    findUsers: (filterObject) => UserModel.find(filterObject),
};
