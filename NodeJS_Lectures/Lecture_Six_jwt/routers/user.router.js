const router = require('express').Router();

const userController = require('../controllers/user.controller');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.isNewUserValid, userController.createUser);

router.get('/:userId', userMiddleware.checkIsIdValid, userController.getSingleUser);

router.delete('/:userId', authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);

module.exports = router;
