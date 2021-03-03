const Car = require('../dataBase/models/Car');

module.exports = {
    findCars: (carQuery) => Car.find(carQuery),

    findCarById: (carId) => Car.findById(carId),

    createCar: (carObject) => Car.create(carObject),

    deleteCar: (carId) => Car.findByIdAndRemove(carId)
};
