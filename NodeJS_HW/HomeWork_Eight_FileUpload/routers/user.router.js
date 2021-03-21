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

router.use('/:userId', userMiddleware.isIdValid,); // за таким роутом завжди буде провірка ID
router.get('/:userId',
    userController.getUserById);
router.put('/:userId',
    authMiddleware.checkAccessToken,
    authMiddleware.isAuthorized,
    userMiddleware.isNewUserValid,
    userController.updateUser);
router.delete('/:userId',
    authMiddleware.checkAccessToken,
    authMiddleware.isAuthorized,
    userController.deleteUser);

module.exports = router;
