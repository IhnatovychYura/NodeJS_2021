const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const apiRouter = require('./routers/api.router');
const { MONGO_URL, PORT } = require('./configs/config');

const app = express();

dotenv.config({ path: path.join(process.cwd(), '../.env') });

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

app.use('/', apiRouter);

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
