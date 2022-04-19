var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var season = new Schema({
    showName: { type: String },
    seasonNumber: { type: Number },
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }]
});

module.exports = mongoose.model('Season', season);