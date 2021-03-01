const fs = require('fs');
const {promisify} = require('util');
const path = require('path');

const createDir = promisify(fs.mkdir);

module.exports = {
    createDir: (dirName) => {
        createDir(path.join(dirName, 'controllers'), {recursive: true}).then();
        createDir(path.join(dirName, 'middlewares'), {recursive: true}).then();
        createDir(path.join(dirName, 'dataBase'), {recursive: true}).then();
        createDir(path.join(dirName, 'services'), {recursive: true}).then();
        createDir(path.join(dirName, 'constants'), {recursive: true}).then();
        createDir(path.join(dirName, 'errors'), {recursive: true}).then();
    }
}
