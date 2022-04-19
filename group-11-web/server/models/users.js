var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favList: { type: mongoose.Schema.Types.ObjectId, ref: 'favourite' },
    recList: { type: mongoose.Schema.Types.ObjectId, ref: 'recommendationList' },
    openProfile: { type: Boolean },
    userAge: { type: Number },
    gender: { type: String }
});

module.exports = mongoose.model('User', user);