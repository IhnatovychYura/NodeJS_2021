const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./routers/api.router');
const dirService = require('./services/dir.service');

const app = express();
const dirName = __dirname;

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => {
    console.log('App listen 5000');
});

dirService.createDir(dirName);

app.use('/', apiRouter); // or app.all('/', apiRouter);

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/node-hw-four', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
