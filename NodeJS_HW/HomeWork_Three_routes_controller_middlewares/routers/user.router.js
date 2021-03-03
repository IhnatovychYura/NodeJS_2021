const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers); // тут можна дістати як всіх users так і знайти по email
router.post('/', userMiddleware.isNewUserValid, userController.createUser);

router.get('/:userId', userMiddleware.checkIsIdValid, userController.getSingleUser);
router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteUser);

module.exports = router;
