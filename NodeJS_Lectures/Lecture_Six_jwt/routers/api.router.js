// цей файл також називають : mount.router.js / main.router.js / api.router.js
const router = require('express').Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
