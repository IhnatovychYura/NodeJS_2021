const { Schema, model } = require('mongoose');

const { dataBaseTables: { USER, CAR } } = require('../../constants');

const userScheme = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    login: { type: String, },
    yearOfBorn: { type: Number },
    cars: [{ type: Schema.Types.ObjectId }],
}, { timestamp: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('full_name').get(function() {
    return `email:${this.email} and login:${this.login}`;
});

userScheme.virtual('userCars', {
    ref: CAR,
    localField: 'cars',
    foreignField: '_id',
});

userScheme.pre('find', function() {
    console.log('PRE FIND HOOK');
    this.populate('userCars');
})
    .pre('findOne', function() {
        console.log('PRE FIND ONE HOOK');
        this.populate('userCars');
    });

module.exports = model(USER, userScheme);
