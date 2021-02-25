const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsIdValid, userController.getSingleUser);

router.post('/', userMiddleware.isNewUserValid, userController.createUser);

router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteUser);

module.exports = router;
