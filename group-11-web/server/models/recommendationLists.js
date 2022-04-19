var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recommendationList = new Schema({

    userEmail: { type: String },
    tvShow: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tvShow' }],
    movie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    ranking: { type: Number, required: true, unique: true }

});

module.exports = mongoose.model('recommendationList', recommendationList);