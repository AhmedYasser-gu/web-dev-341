var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var episode = new Schema({
    episodeNr: { type: Number },
    episodeName: { type: String, unique: true },
    episodeLength: { type: Number }
});

module.exports = mongoose.model('Episode', episode);