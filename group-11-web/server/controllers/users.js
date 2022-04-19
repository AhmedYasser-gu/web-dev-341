var express = require('express');
var router = express.Router();
var User = require('../models/users');
var recommendationList = require('../models/recommendationLists');
var FavouriteList = require('../models/favouriteLists');

// Create user
router.post('/api/users', function (req, res) {

    const userEmail = req.body.userEmail;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    var newrec = new recommendationList
    var newfav = new FavouriteList

    var newuser = new User({
        userEmail: userEmail,
        firstName: firstName,
        lastName: lastName,
        password: password,
        favList: newfav,
        recList: newrec
    });

    User.findOne({ userEmail: newuser.userEmail }, function (err, user) {
        if (user != null) {
            return res.status(403).json({ auth: false, message: "Already exists" });
        }
        newrec.save((err, doc) => { })
        newfav.save((err, doc) => { })
        newuser.save((err, doc) => {
            if (err) {
                return res.status(400).json({ success: false, message: "Failed to save user" });
            }
            res.status(200).json({
                succes: true,
                newuser: doc
            });
        });
    });
});

// Get one user
router.get('/api/users', function (req, res) {
    var fEmail = req.query.email
    User.findOne({ userEmail: fEmail }, function (err, user) {
        if (err || user == null) return res.status(404).json({ "message": "Could not find user" });
        else {
            return res.status(200).json({ Users: user })
        }
    })
});

//get multiple user
/*router.get('/api/users', function (req, res) {
    User.find({}, function (err, user) {
        if (err) return res.status(402).json({ "message": "Could not find user" });
        return res.status(200).json({ Users: user })
    })
});*/

// Change password
router.patch('/api/users', function (req, res) {
    var reqEmail = req.body.userEmail;
    var reqPass = req.body.newPassword;
    User.findOneAndUpdate({ userEmail: reqEmail }, { password: reqPass }, function (err, user) {
        if (err) {
            return res.send(err);
        }
        return res.status(201).json({ message: "Updated password" });
    });
});

// Delete by email
router.delete('/api/users', function (req, res) {
    var reqEmail = req.body.userEmail
    User.findOneAndDelete({ userEmail: reqEmail }, function (err, user) {
        if (err || user == null) {
            return res.status(404).json({ "message": "User not found" });
        } else {
            recommendationList.findOneAndDelete({ _id: user.recList }, function (err, rec) { })
            FavouriteList.findOneAndDelete({ _id: user.favList }, function (err, fav) { })
            return res.status(201).json({ "message": "User deleted" })
        }
    });
});

module.exports = router;