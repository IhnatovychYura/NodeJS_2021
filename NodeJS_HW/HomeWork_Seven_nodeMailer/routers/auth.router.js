const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/', authMiddleware.existUserInDBforAuth, authController.authUser);

router.post('/refreshToken', authMiddleware.checkRefreshToken, authController.createNewTokens);

module.exports = router;
