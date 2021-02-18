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
let path1800 = path.join(__dirname, 'Task1', '1800');
let path2000 = path.join(__dirname, 'Task1', '2000');

function searchFile(path1800, path2000) {
    fs.readdir(path1800, (err, files1800) => {
        if (err) {
            console.log('___________________________________________');
            console.log(err);
            console.log('___________________________________________');
            return;
        }

        files1800.forEach(fileName => {
            fs.stat(path1800 +`/${fileName}`, (err, stat) => {
                if (err) {
                    console.log('___________________________________________');
                    console.log(err);
                    console.log('___________________________________________');
                    return;
                }
                if (stat.isDirectory() === false) {
                    checkAndSortGender1800(fileName, path1800);
                }
            })
        })
    })

    fs.readdir(path2000, (err1, files2000) => {
        if (err1) {
            console.log('___________________________________________');
            console.log(err1);
            console.log('___________________________________________');
            return;
        }

        files2000.forEach(fileName => {
            fs.stat(path2000 + `/${fileName}`, (err, stat) => {
                if (err) {
                    console.log('___________________________________________');
                    console.log(err);
                    console.log('___________________________________________');
                    return;
                }
                if (stat.isDirectory() === false) {
                    checkAndSortGender2000(fileName, path2000);
                }
            })
        })
    })
}

function checkAndSortGender1800(file, path1800) {
    fs.readFile(path1800 + `/${file}`, (err, data) => {
        if (err) {
            console.log('___________________________________________');
            console.log(err);
            console.log('___________________________________________');
            return;
        }
        if (JSON.parse(data).gender === 'male') {
            fs.rename(path1800 + `/${file}`, path.join(__dirname, 'Task1', '2000', `${file}`), err1 => {
                if (err1) {
                    console.log('___________________________________________');
                    console.log(err1);
                    console.log('___________________________________________');
                }
            })
        }
    })
}

function checkAndSortGender2000(file, path2000) {
    fs.readFile(path2000 +`/${file}`, (err, data) => {
        if (err) {
            console.log('___________________________________________');
            console.log(err);
            console.log('___________________________________________');
            return;
        }
        if (JSON.parse(data).gender === 'female') {
            fs.rename(path2000 +`/${file}`, path.join(__dirname, 'Task1', '1800', `${file}`), err1 => {
                if (err1) {
                    console.log('___________________________________________');
                    console.log(err1);
                    console.log('___________________________________________');
                }
            })
        }
    })
}

searchFile(path1800, path2000);
