const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

//   Variant 1   //
// router.post('/', authMiddleware.existUserInDBforAuth, authController.authUser);

//   Variant 2   //
router.route('/')
    .post(authMiddleware.existUserInDBforAuth, authController.authUser);

//   Variant 1   //
// router.post('/refreshToken', authMiddleware.checkRefreshToken, authController.createNewTokens);

//   Variant 2   //
router.route('/refreshToken')
    .post(authMiddleware.checkRefreshToken, authController.createNewTokens);

module.exports = router;
