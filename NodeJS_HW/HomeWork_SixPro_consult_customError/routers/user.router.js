const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

//   Variant 1   //
// router.get('/',
//     userMiddleware.isUserQueryValid,
//     userController.getAllUsers);
// router.post('/',
//     userMiddleware.isNewUserValid,
//     userMiddleware.existUserInDB,
//     userController.createUser);

//   Variant 2  //
router.route('/')
    .get(userMiddleware.isUserQueryValid, userController.getAllUsers)
    .post(userMiddleware.isNewUserValid, userMiddleware.existUserInDB, userController.createUser);

//   Variant 1   //
// router.use('/:userId', userMiddleware.isIdValid,); // за таким роутом завжди буде провірка ID
// router.get('/:userId',
//     userController.getUserById);
// router.put('/:userId',
//     authMiddleware.checkAccessToken,
//     authMiddleware.isAuthorized,
//     userMiddleware.isNewUserValid,
//     userController.updateUser);
// router.delete('/:userId',
//     authMiddleware.checkAccessToken,
//     authMiddleware.isAuthorized,
//     userController.deleteUser);

//   Variant 2  //
router.route('/:userId')
    .all(userMiddleware.isIdValid)
    .get(userController.getUserById)
    .put(authMiddleware.checkAccessToken, authMiddleware.isAuthorized, userMiddleware.isNewUserValid, userController.updateUser)
    .delete(authMiddleware.checkAccessToken, authMiddleware.isAuthorized, userController.deleteUser);

module.exports = router;
