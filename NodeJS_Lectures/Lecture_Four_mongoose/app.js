const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const apiRouter = require('./routers/api.router');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('App listen 5000')
});

app.use('/', apiRouter); // or app.all('/', apiRouter);

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/sep-2020', {useNewUrlParser: true, useUnifiedTopology: true});

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    })
}
