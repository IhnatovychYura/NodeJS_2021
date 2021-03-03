const { Schema, model } = require('mongoose');

const userScheme = new Schema({
    email: { type: String, required: true, },
    login: { type: String },
    password: { type: Number, required: true },
    cars: [{ type: Schema.Types.ObjectId }]
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
        this.populate('userCars');
    })
    .pre('findOne', function() {
        this.populate('userCars');
    });

module.exports = model('User', userScheme);
