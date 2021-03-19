const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carMiddleware.isCarQueryValid, carController.getAllCars);
router.post('/', carMiddleware.isNewCarValid, carController.createCar);

router.use('/:carId', carMiddleware.isIdValid);
router.get('/:carId', carController.getCarById);
router.delete('/:carId', carController.deleteCar);

module.exports = router;
