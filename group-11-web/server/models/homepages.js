var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homepage = new Schema({
    userEmail: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    setting: { type: mongoose.Schema.Types.ObjectId, ref: 'settings' },
    dashboard: { type: mongoose.Schema.Types.ObjectId, ref: 'dashBoard' }
});

module.exports = mongoose.model('homepage', homepage);