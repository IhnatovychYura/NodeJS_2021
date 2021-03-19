const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

//   Variant 1   //
// router.get('/', carMiddleware.isCarQueryValid, carController.getAllCars);
// router.post('/', carMiddleware.isNewCarValid, carController.createCar);

//   Variant 2   //
router.route('/')
    .get(carMiddleware.isCarQueryValid, carController.getAllCars)
    .post(carMiddleware.isNewCarValid, carController.createCar);

//   Variant 1   //
// router.use('/:carId', carMiddleware.isIdValid);
// router.get('/:carId', carController.getCarById);
// router.delete('/:carId', carController.deleteCar);

//   Variant 2   //
router.route('/:carId')
    .all(carMiddleware.isIdValid)
    .get(carController.getCarById)
    .delete(carController.deleteCar);

module.exports = router;
