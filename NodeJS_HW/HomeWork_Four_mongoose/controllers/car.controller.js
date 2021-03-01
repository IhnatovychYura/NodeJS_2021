const carService = require('../services/car.service');
const statusCode = require('../constants/statusCodes.enums');
const errorMessage = require('../errors/errors.messages');

module.exports = {

    getCars: async (req, res) => {
        try {
            const cars = await carService.findCars(req.query);

            res.json(cars);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getSingleCar: async (req, res) => {
        try {
            const {carId} = req.params;
            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);

            res.status(statusCode.CREATED).json(errorMessage.USER_CREATED['ua']);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const {carId} = req.params;

            await carService.deleteCar(carId);

            res.status(statusCode.NOT_FOUND).json(errorMessage.USER_DELETED['ua']);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
}
