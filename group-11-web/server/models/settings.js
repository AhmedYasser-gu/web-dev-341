var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settings = new Schema({
    changeUserName: { type: String }
});

module.exports = mongoose.model('settings', settings);