var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var review = require('./reviews')

var movie = new Schema({
    movieName: { type: String, required: true },
    movieStory: { type: String },
    movieReleaseDate: { type: String },
    movieGenre: { type: String },
    movieLength: { type: Number },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    movieDirector: { type: String },
    movieActors: { type: Array },
    poster: { type: String }
});

module.exports = mongoose.model('Movie', movie);