const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.get('/',
    userMiddleware.isUserQueryValid,
    userController.getAllUsers);
router.post('/',
    userMiddleware.isNewUserValid,
    userMiddleware.existUserInDB,
    userController.createUser);

router.get('/:userId',
    userMiddleware.isIdValid,
    userController.getUserById);
router.put('/:userId',
    authMiddleware.checkAccessToken,
    authMiddleware.isAuthorized,
    userMiddleware.isIdValid,
    userMiddleware.isNewUserValid,
    userController.updateUser);
router.delete('/:userId',
    authMiddleware.checkAccessToken,
    authMiddleware.isAuthorized,
    userMiddleware.isIdValid,
    userController.deleteUser);

module.exports = router;
