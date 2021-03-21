require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./routers/api.router');
const { MONGO_URL, PORT } = require('./configs/config');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            text: err.message || '',
            isPublic: err.isPublic || '',
        });
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
