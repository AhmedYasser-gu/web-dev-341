var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var signInEmail = new Schema({
    emails: { type: String, required: true }
});

module.exports = mongoose.model('SignInEmail', signInEmail);