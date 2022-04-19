var express = require('express');
var router = express.Router();
var RecommendationList = require('../models/recommendationLists');
var Users = require('../models/users');

router.post('/api/recommendationlist', function (req, res, next) {
    var reqEmail = req.body.userEmail

    var newRecommendationList = new RecommendationList({
        userEmail: req.body.userEmail,
        tvShows: req.body.tvShows,
        movie: req.body.movies,
        ranking: req.body.ranking
    });
    newRecommendationList.save((err, doc) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: "Failed to save recommendation list"
            });
        }
        Users.findOneAndUpdate({ userEmail: reqEmail }, { recList: newRecommendationList }, function (err, user) {
            if (err) return res.status(400).json({ message: "Could not find user" })
        })
        res.status(200).json({
            succes: true,
            newRecommendationList: doc
        });
    });
});

//get one recommended list based on id
router.get('/api/recommendationlist/:id', function (req, res, next) {
    var id = req.params.id;
    RecommendationList.findById(id, function (err, rec) {
        if (err || rec == null) {
            return res.status(404).json(
                { "message": "Recommended list not found" });
        } else {
            return res.status(200).json({ rec })
        }
    });
});

//get all recommended list
router.get('/api/recommendationlist', function (req, res, next) {
    RecommendationList.find({}, function (err, recommendedList) {
        if (err) {
            return next(err);
        }
        res.json({ "Recommended List": recommendedList });
    });
});

//remove recommended list based on id
router.delete('/api/recommendationlist/:id', function (req, res) {
    var recommendationListId = req.params.id;
    RecommendationList.findByIdAndDelete(recommendationListId, (err, deletedRecord) => {
        if (err || deletedRecord == null) {
            return res.status(400).json({ success: false, message: "Something went wrong" })
        } else {
            res.status(201).json({ success: true, message: "Recommended list removed" })
        }
    })
});

module.exports = router;