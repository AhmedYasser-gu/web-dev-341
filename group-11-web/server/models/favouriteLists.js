var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var favouriteList = new Schema({
    userEmail: { type: String },
    favouriteListName: { type: String, default: 'Favorite List' },
    favoriteListNr: { type: Number, default: 0 },
    favouriteObjectsInList: { type: Number, default: 0 },
    tvShow: [{ type: String }],
    movie: [{ type: String }]
});

module.exports = mongoose.model('favourite', favouriteList);