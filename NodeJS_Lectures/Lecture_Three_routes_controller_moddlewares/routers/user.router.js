const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.isNewUserValid, userController.createUser);

router.get('/:userId', userMiddleware.checkIsIdValid, userController.getSingleUser);

module.exports = router;
