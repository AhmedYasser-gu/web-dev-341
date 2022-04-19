var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tvShow = new Schema({
    tvShowName: { type: String, required: true },
    tvShowDescription: { type: String },
    tvShowreleaseDate: { type: Number },
    tvShowcast: { type: Array },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Season' }],
    poster: { type: String }
});

module.exports = mongoose.model('tvShows', tvShow);