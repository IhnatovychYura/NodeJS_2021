const { CarModel } = require('../dataBase/models');

module.exports = {
    createCar: (carObject) => CarModel.create(carObject),
    deleteCar: (carId) => CarModel.findByIdAndDelete(carId),
    findCars: (carObject) => CarModel.find(carObject),
    findCarById: (carId) => CarModel.findById(carId),
};
