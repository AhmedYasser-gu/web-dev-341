var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dashBoard = new Schema({
    userEmail: { type: String },
    worldwideTopList: { type: mongoose.Schema.Types.ObjectId, ref: 'worldwideTopList' },
    favouriteList: { type: mongoose.Schema.Types.ObjectId, ref: 'favourite' },
    recommendationList: { type: mongoose.Schema.Types.ObjectId, ref: 'recommendationList' }
});

module.exports = mongoose.model('dashBoard', dashBoard);
