const Car = require('../dataBase/models/Car');
const errorMessage = require('../errors/errors.messages');

module.exports = {
    findCars: (carQuery) => {
        return Car.find(carQuery);
    },

    findCarById: (carId) => {
        return Car.findById(carId);
    },

    createCar: (carObject) => {

        return Car.create(carObject);
    },

    deleteCar: (carId) => {
        return Car.findByIdAndRemove(carId);
    }
}
