const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.get('/', userMiddleware.isUserQueryValid, userController.getAllUsers);
router.post('/', userMiddleware.isNewUserValid, userMiddleware.existUserInDB, userController.createUser);

router.get('/:userId', userMiddleware.isIdValid, userController.getUserById);
router.put('/:userId',
    userMiddleware.isIdValid,
    userMiddleware.isNewUserValid,
    authMiddleware.checkAccessToken,
    userController.updateUser);
router.delete('/:userId', userMiddleware.isIdValid, authMiddleware.checkAccessToken, userController.deleteUser);

module.exports = router;
