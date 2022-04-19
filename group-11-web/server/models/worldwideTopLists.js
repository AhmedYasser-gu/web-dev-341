var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tvShows = require('./tvShows')
var Movie = require('./movies')

var worldwideTopList = new Schema({
    tvshows: [{ type: mongoose.Schema.Types.ObjectId, ref: tvShows }],
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: Movie }]
});

module.exports = mongoose.model('worldwideTopList', worldwideTopList);