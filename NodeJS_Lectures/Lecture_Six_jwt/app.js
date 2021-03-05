const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const apiRouter = require('./routers/api.router');

const app = express();

dotenv.config();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => {
    console.log('App listen 5000');
});

app.use('/', apiRouter); // or app.all('/', apiRouter);

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/sep-2020', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
