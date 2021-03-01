const {Schema, model} = require('mongoose');

const carScheme = new Schema({
        model: {type: String},
        color: {type: String},
        price: {type: Number},
    },
    {
        timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}
    });

module.exports = model('Car', carScheme);
