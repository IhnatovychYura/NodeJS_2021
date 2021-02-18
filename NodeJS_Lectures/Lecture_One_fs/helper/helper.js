const number = 22;

function greeting(name, age) {
    logger(`Hello Node.JS I'm ${name} and I'm ${age} years old`)
}

function logger(param) {
    console.log(param);
}

class NodeJS {
    constructor(name) {
        this.name = name;
    }

    answerHello() {
        console.log(`${this.name} say hello too and you are Welcome`)
    }
}

global.date = '18.02.21';

// Variant 1
exports.test = "NodeJS !!!"

// Variant 2
module.exports = {
    number,
    greeting,
    NodeJS
}
