var express = require('express');
var router = express.Router();
var User = require('../models/users');
var SignInEmail = require('../models/signin');

// sign in user
router.post('/api/signin', function (req, res) {
    var email = req.body.userEmail
    var emailSigned = new SignInEmail({ emails: email })

    User.findOne({ userEmail: email }, function (err, user) {
        if (err || user == null) {
            return res.status(401).json({ "message": "Could not find user" })
        } else {
            SignInEmail.findOne({ emails: email }, function (err, user) {
                if (user != null) {
                    return res.status(403).json({ "message": "Already exists" })
                }
                emailSigned.save((err, doc) => {
                    if (err) {
                        return res.status(400).json({ message: "Failed to log in user" })
                    }
                    return res.status(200).json({ emailSigned: doc });
                })
            })
        }
    })
})

// get user
router.get('/api/signin', function (req, res) {
    SignInEmail.find(function (err, emails) {
        if (err) return res.status(402).json({ "message": "Could not find user" });
        return res.status(200).json({ "Signed in": emails })
    })
});

// sign out user
router.delete('/api/signin', function (req, res) {
    var email = req.body.userEmail

    SignInEmail.findOneAndDelete({ emails: email }, function (err, user) {
        if (err || user == null) {
            return res.status(404).json({ "message": "User not signed in" })
        } else {
            res.status(201).json({ "message": "Signed out" })
        }
    })
})

module.exports = router;