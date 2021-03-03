const router = require('express').Router();

const carController = require('../controllers/car.controller');
const carMiddleware = require('../middlewares/car.middleware');

router.get('/', carController.getCars);
router.post('/', carMiddleware.isNewCarValid, carController.createCar);

router.get('/:carId', carMiddleware.checkIsIdValid, carController.getSingleCar);
router.delete('/:carId', carMiddleware.checkIsIdValid, carController.deleteCar);

module.exports = router;
