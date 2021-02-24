const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getSingleUser);

router.post('/', userController.createUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
