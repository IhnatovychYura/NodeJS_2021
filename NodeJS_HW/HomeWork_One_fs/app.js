const {users} = require('./Task1/data');

const fs = require('fs');
const path = require('path');

/////////////////////////////  Task One  /////////////////////////////////////
console.log(__dirname);

///  Creation directories and files  ///

fs.mkdir(path.join(__dirname, 'Task1'), {recursive: true},  err => {
    if (err) {
        console.log('___________________________________________');
        console.log(err);
        console.log('___________________________________________');
    }
})

fs.writeFile(path.join(__dirname, 'Task1', 'data.js'), '// Data Users //', err => {
    if (err) {
        console.log('___________________________________________');
        console.log(err);
        console.log('___________________________________________');
    }
})

fs.unlink(path.join(__dirname, 'Task1', 'data.js'), err => {
    if (err) {
        console.log('___________________________________________');
        console.log(err);
        console.log('___________________________________________');
    }
})

fs.mkdir(path.join(__dirname, 'Task1', '1800'), {recursive: true},  err => {
    if (err) {
        console.log('___________________________________________');
        console.log(err);
        console.log('___________________________________________');
    }
})

fs.mkdir(path.join(__dirname, 'Task1', '2000'), {recursive: true},  err => {
    if (err) {
        console.log('___________________________________________');
        console.log(err);
        console.log('___________________________________________');
    }
})

///  Insert random users from data to directories "1800" and "2000"  ///

for (let i=1; i <= 5; i++){
    let user = JSON.stringify(users[i]);
    fs.writeFile(path.join(__dirname, 'Task1', '1800', `user${[i]}.json`), `${user}` , err => {
        if (err) {
            console.log('___________________________________________');
            console.log(err);
            console.log('___________________________________________');
        }
    })
}

for (let i=6; i <= 10; i++){
    let user = JSON.stringify(users[i]);
    fs.writeFile(path.join(__dirname, 'Task1', '2000', `user${[i]}.json`), `${user}` , err => {
        if (err) {
            console.log('___________________________________________');
            console.log(err);
            console.log('___________________________________________');
        }
    })
}

///  Sort users by gender => girls to directory "1800" and boys to directory "2000"  ///

let pathFemale = path.join(__dirname, 'Task1', '1800');
let pathMale = path.join(__dirname, 'Task1', '2000');

function searchFile(pathFemale, pathMale) {
    // check directory 1800
    fs.readdir(pathFemale, (err, files) => {
        if (err) {
            console.log('___________________________________________');
            console.log(err);
            console.log('___________________________________________');
            return;
        }

        files.forEach(fileName => {
            fs.stat(pathFemale +`/${fileName}`, (err1, stat) => {
                if (err1) {
                    console.log('___________________________________________');
                    console.log(err1);
                    console.log('___________________________________________');
                    return;
                }
                let pathToFile = pathFemale +`/${fileName}`;
                if (stat.isDirectory() === false) {
                    checkAndSortGender(fileName, pathToFile);
                }
            })
        })
    })

    // check directory 2000
    fs.readdir(pathMale,(err, files) => {
        if (err) {
            console.log('___________________________________________');
            console.log(err);
            console.log('___________________________________________');
            return;
        }

        files.forEach(fileName => {
            fs.stat(pathMale + `/${fileName}`, (err1, stat) => {
                if (err1) {
                    console.log('___________________________________________');
                    console.log(err1);
                    console.log('___________________________________________');
                    return;
                }
                let pathToFile = pathMale +`/${fileName}`;
                if (stat.isDirectory() === false) {
                    checkAndSortGender(fileName, pathToFile);
                }
            })
        })
    })
}

function checkAndSortGender(file, pathToFile) {
    fs.readFile(pathToFile, (err, data) => {
        if (err) {
            console.log('___________________________________________');
            console.log(err);
            console.log('___________________________________________');
            return;
        }
        if (JSON.parse(data).gender === 'male') {
            fs.rename(pathToFile, path.join(__dirname, 'Task1', '2000', `${file}`), err1 => {
                if (err1) {
                    console.log('___________________________________________');
                    console.log(err1);
                    console.log('___________________________________________');
                }
            })
        }
        if (JSON.parse(data).gender === 'female') {
            fs.rename(pathToFile, path.join(__dirname, 'Task1', '1800', `${file}`), err2 => {
                if (err2) {
                    console.log('___________________________________________');
                    console.log(err2);
                    console.log('___________________________________________');
                }
            })
        }
    })
}

searchFile(pathFemale, pathMale);

/////////////////////////////  Task Two  /////////////////////////////////////

///  Create directories  ///

fs.mkdir(path.join(__dirname, 'Task2', 'FolderOne', 'FolderOneOne', 'FolderOneOneOne'), {recursive: true},  err => {
    if (err) {
        console.log('___________________________________________');
        console.log(err);
        console.log('___________________________________________');
    }
})

fs.mkdir(path.join(__dirname, 'Task2', 'FolderOne', 'FolderOneTwo'), {recursive: true},  err => {
    if (err) {
        console.log('___________________________________________');
        console.log(err);
        console.log('___________________________________________');
    }
})

fs.mkdir(path.join(__dirname, 'Task2', 'FilesInOrder'), {recursive: true},  err => {
    if (err) {
        console.log('___________________________________________');
        console.log(err);
        console.log('___________________________________________');
    }
})

///  Find Files using recursion ///

const startDirPath = path.join(__dirname, 'Task2', 'FolderOne');

function searchFiles(startDirPath) {
    fs.readdir(startDirPath, (err, files) => {
        files.forEach(item => {

            const nextDirPath = path.join(startDirPath, item);

            fs.stat(nextDirPath, (err, stat) => {
                if (stat.isDirectory() === true) {
                    searchFiles(nextDirPath)
                }
                if (stat.isDirectory() === false) {
                    changeDir(item, nextDirPath)
                }
            })
        })
    })
}

///  Move Files to correct directory ///

function changeDir(file, filePath) {
    fs.rename(filePath,  path.join(__dirname, 'Task2', 'FilesInOrder', `${file}`), err => {
        if (err) {
            console.log('___________________________________________');
            console.log(err);
            console.log('___________________________________________');
        }
    })
}

searchFiles(startDirPath)







