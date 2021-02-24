const express = require('express');

const apiRouter = require('./routers/api.router');
const dirService = require('./services/dir.service');

const app = express();
const dirName = __dirname;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('App listen 5000')
});

dirService.createDir(dirName);

app.use('/', apiRouter); // or app.all('/', apiRouter);
