const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.isNewUserValid, userController.createUser);

router.get('/:userId', userMiddleware.checkIsIdValid, userController.getSingleUser);
router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteUser);

module.exports = router;
