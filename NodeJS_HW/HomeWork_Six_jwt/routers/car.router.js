const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carMiddleware.isCarQueryValid, carController.getAllCars);
router.post('/', carMiddleware.isNewCarValid, carController.createCar);

router.get('/:carId', carMiddleware.isIdValid, carController.getCarById);
router.delete('/:carId', carMiddleware.isIdValid, carController.deleteCar);

module.exports = router;
