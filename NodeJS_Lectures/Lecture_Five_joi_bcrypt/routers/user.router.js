const router = require('express').Router();

const userController = require('../controllers/user.controller');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.isNewUserValid, userController.createUser);

router.get('/:userId', userController.getSingleUser);

module.exports = router;
