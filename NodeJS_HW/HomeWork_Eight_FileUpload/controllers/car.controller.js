const { statusCode, statusMessages } = require('../constants');
const { carService } = require('../services');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.findCars(req.query);

            res.json(cars);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    getCarById: async (req, res) => {
        try {
            const { carId } = req.params;
            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    createCar: async (req, res) => {
        try {
            const { prefLang = 'en' } = req.query;

            await carService.createCar(req.body);

            res.status(statusCode.CREATED).json(statusMessages.CAR_CREATED[prefLang]);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    deleteCar: async (req, res) => {
        try {
            const { prefLang = 'en' } = req.query;
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.status(statusCode.NOT_FOUND).json(statusMessages.CAR_WAS_DELETED[prefLang]);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
