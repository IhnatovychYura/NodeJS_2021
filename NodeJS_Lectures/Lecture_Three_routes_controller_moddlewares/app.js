const express = require('express');
const path = require('path');

const apiRouter = require('./routers/api.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('App listen 5000')
});

app.use('/', apiRouter); // or app.all('/', apiRouter);
