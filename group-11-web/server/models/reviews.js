var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tvshow = require('./tvShows')
var movie = require('./movies')

var review = new Schema({
    mediaName: { type: String },
    publishDate: { type: Date },
    reviewScore: { type: Number },
    reviewComment: { type: String },
    reviewEdit: { type: Boolean }
});

module.exports = mongoose.model('Review', review);