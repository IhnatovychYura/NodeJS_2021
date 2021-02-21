const {number, greeting, NodeJS} = require('./helper/helper');

console.log(number);

greeting('Yuriy', 25);  

const nodeJS = new NodeJS('NodeJS')

nodeJS.answerHello();

console.log('___________________________________________');
console.log(__dirname);
console.log(__filename);
console.log('___________________________________________');
console.log(process);
console.log('*******************************************');
console.log(process.env);
console.log(process.env.key = 'SECRET');

console.log(date)

//////////////////////////   FS   /////////////////////////////////

const fs = require('fs');

const filePath = __dirname + '/helper/file.txt';
const dirName = __dirname + '/helper';

// fs ==> Create files (insert path(root) for new file, insert data for new file, insert error msg if something goes wrong)
// fs.writeFile(filePath, 'Hello World', err => {
//     if (err) {
//         console.log('___________________________________________');
//         console.log(err);
//         console.log('___________________________________________');
//     }
// })

// fs ==> Add smth new in available file (insert path(root) of file, insert new data for file, insert error msg if something goes wrong)
// fs.appendFile(filePath, 'Hello again, Im appendFile data \n', err => {
//     if (err) {
//         console.log('___________________________________________');
//         console.log(err);
//         console.log('___________________________________________');
//     }
// })

// fs ==> create new Directory, ( insert new path(root), insert option recursive to create all root (all new directories), insert error msg if something goes wrong)
// by default it will create just last dir -> "LordOfTheRing", without recursive=true it will be an error
// fs.mkdir(`${__dirname}/netflix/films/LordOfTheRing`, {recursive: true},  err => {
//     if (err) {
//         console.log('___________________________________________');
//         console.log(err);
//         console.log('___________________________________________');
//     }
// })

// fs ==> delete(remove) Directory, ( insert new path(root), insert error msg if something goes wrong)
// by default it will deleter just last dir -> "LordOfTheRing"
// fs.rmdir(`${__dirname}/netflix/films/LordOfTheRing`, err => {
//     if (err) {
//         console.log('___________________________________________');
//         console.log(err);
//         console.log('___________________________________________');
//     }
// })

// fs ==> read what contains directory (insert new path(root), callback: error and data)
// fs.readdir(dirName, (err, files) => {
//     if (err) {                                                          //
//         console.log('___________________________________________');     //   error first
//         console.log(err);                                               //
//         console.log('___________________________________________');     //
//
//         return;                                                         //     early return pattern
//     }
//     console.log(files);                                                  //    data(file)  last
// })


// also we can read all statistic info about files in directory
// fs.readdir(dirName, (err, files) => {
//     if (err) {                                                          //
//         console.log('___________________________________________');     //   error first
//         console.log(err);                                               //
//         console.log('___________________________________________');     //
//
//         return;                                                         //     early return pattern
//     }
//
//     files.forEach(fileName => {
//         fs.stat(dirName + `/${fileName}`, (err, stat) => {
//             if (err) {
//                 console.log('___________________________________________');
//                 console.log(err);
//                 console.log('___________________________________________');
//
//                 return;
//             }
//
//             console.log('=================================================');
//             console.log(stat)
//             console.log('==================================================');
//             console.log('**************************************************');
//             console.log(stat.isDirectory())  // to check what is file and what is directory
//             console.log('**************************************************');
//         })
//     })
// })

// fs ==> read what contains in file (insert path(root) to file, callback: error and data)
// by default data in file will be like Buffer code, that is why we use .toString()
// fs.readFile(filePath, (err, data) => {
//     if (err) {
//         console.log('___________________________________________');
//         console.log(err);
//         console.log('___________________________________________');
//         return;
//     }
//     console.log(data.toString());
// })

// fs ==> delete(remove) Files, ( insert new path(root), insert error msg if something goes wrong)
// fs.unlink(filePath, err => {
//     if (err) {
//         console.log('___________________________________________');
//         console.log(err);
//         console.log('___________________________________________');
//     }
// })

//fs ==> rename and move Files, (insert old path(root), insert new path(root), insert error msg if something goes wrong)
// fs.rename(`${dirName}/test/king.txt`, `${dirName}/netflix/movie.txt`, err => {
//     if (err) {
//         console.log('___________________________________________');
//         console.log(err);
//         console.log('___________________________________________');
//     }
// })

//fs ==> copy File, (insert old path(root), insert new path(root), insert error msg if something goes wrong)
// fs.copyFile(`${dirName}/file.txt`, `${dirName}/netflix/file.txt`,  err => {
//     if (err) {
//         console.log('___________________________________________');
//         console.log(err);
//         console.log('___________________________________________');
//     }
// })

//////////////////////////   PATH   /////////////////////////////////
// Вбудована бібліотека, яка нормалізує шляхи
const path = require('path');
//
// let s = path.join(__dirname, 'helper', '//////////////file.txt');
// console.log(s);
//
// const wrongPath = __dirname + 'helper' + '//////////////file.txt';
// let normalizedPath = path.normalize(wrongPath);
// console.log(normalizedPath);


//////////////////////////   STREAM   /////////////////////////////////
// 3 variables of stream: read, write and duplex (2 in 1)
// const readStream = fs.createReadStream(filePath);
// const writeStream = fs.createWriteStream(filePath);

// readStream.on('data', chunk => {
//     console.log(chunk);                               // every chunk it is 65 kb
// })
//
// readStream.on('end', chunk => {
//     console.log('Casino 3 topora')
// })
//
// // stream stops after  first chunk
// readStream.once('end', chunk => {
//     console.log('Casino 3 topora')
// })

// for (let i = 0; i < 100000; i++) {
//     writeStream.write('Hello from Stream')
// }

// duplex
// але все що прийде з РедСтрім до ВрайтСтрім перезапише все що було у файлі на нову інфу
// const readStream = fs.createReadStream(path.join(__dirname, 'helper', 'file.txt'));
// const writeStream = fs.createWriteStream(path.join(__dirname, 'helper', 'netflix', 'file.txt'));
//
// Variant 1
// readStream.on('data', chunk => {
//     writeStream.write(chunk);
// })
//
// Variant 2
// readStream.pipe(writeStream );
