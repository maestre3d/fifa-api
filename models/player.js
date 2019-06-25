const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: String,
    surname: String,
    alias: { type: String, default: null },
    age: { type: Number, default: 12 },
    nation: String,
    birthdate: { type: Number, default: new Date().getTime() },
    team: { type: Schema.ObjectId, ref: 'Team', default: null }
});

module.exports = mongoose.model('Player', PlayerSchema);