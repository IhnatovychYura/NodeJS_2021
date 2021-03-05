const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { O_AUTH } } = require('../../constants');

const oAuthScheme = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamp: true });

module.exports = model(O_AUTH, oAuthScheme);
