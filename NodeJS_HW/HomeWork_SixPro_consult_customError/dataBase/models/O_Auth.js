const { Schema, model } = require('mongoose');

const { dataBaseTables: { O_AUTH, USER } } = require('../../constants');

const oAuthScheme = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: USER }
}, { timestamp: true });

module.exports = model(O_AUTH, oAuthScheme);
