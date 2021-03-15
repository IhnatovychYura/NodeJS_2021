const { Schema, model } = require('mongoose');

const { dataBaseTables: { CAR } } = require('../../constants');

const carScheme = new Schema({
    color: { type: String },
    model: { type: String },
    price: { type: Number },
});

module.exports = model(CAR, carScheme);
