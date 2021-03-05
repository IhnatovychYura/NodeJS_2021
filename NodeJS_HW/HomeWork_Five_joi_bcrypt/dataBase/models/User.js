const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { USER } } = require('../../constants');

const userScheme = new Schema({
    email: { type: String },
    login: { type: String },
    password: { type: String },
    yearOfBorn: { type: Number },
    cars: [{ type: Schema.Types.Mixed }]
},
{
    timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }
});

userScheme.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id',
});

userScheme
    .pre('find', function() {
        console.log('PRE FIND HOOK');
        this.populate('userCars');
    })
    .pre('findOne', function() {
        console.log('PRE FIND ONE HOOK');
        this.populate('userCars');
    });

module.exports = model(USER, userScheme);
