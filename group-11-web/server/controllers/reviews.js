var express = require('express');
var router = express.Router();
var Review = require('../models/reviews');
var Movies = require('../models/movies');
var TvShow = require('../models/tvShows');
const reviews = require('../models/reviews');

//post review
router.post('/api/reviews', function (req, res) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var mediaName = req.body.mediaName;

    var newReview = new Review({
        mediaName,
        publishDate: date,
        reviewScore: req.body.reviewScore,
        reviewComment: req.body.reviewComment,
        reviewEdit: false
    })

    Movies.findOneAndUpdate({ movieName: mediaName }, { $addToSet: { reviews: newReview } }, { new: true }, (err, movie) => { })
    TvShow.findOneAndUpdate({ tvShowName: mediaName }, { $addToSet: { reviews: newReview } }, { new: true }, (err, tvShow) => { })

    newReview.save((err, doc) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Failed to save review" });
        }
        return res.status(200).json({ success: true, newReview: doc, message: "Successfully saved review" })
    })
});

// Get reviews based on medianame
router.get('/api/reviews/', function (req, res, next) {
    var reqMedia = req.body.mediaName;
    Review.find({ mediaName: reqMedia }, function (err, review) {
        if (err) {
            return
            next(err);
        }
        if (review == null) {
            return res.status(404).json(
                { "message": "Reviews not found" });
        }
        res.status(200).json({ succes: true, review });
    });
});


//get review based on id
router.get('/api/reviews/:id', function (req, res, next) {
    var reqID = req.params.id;
    Review.findById(reqID, function (err, review) {
        if (err) {
            return next(err);
        }
        if (review == null) {
            return res.status(404).json({ message: "Review not found" })
        }
        res.status(200).json({ "Review": review })
    })
})

router.put('/api/reviews/:id', function (req, res) {
    reqId = req.params.id;
    Review.findByIdAndUpdate({ _id: reqId }, req.body, { new: true }).then(function (err, review) {
        res.send(review)
    });
});

//delete review by id
router.delete('/api/reviews/:id', function (req, res) {
    var deleteReviewId = req.params.id;
    Review.findByIdAndDelete(deleteReviewId, (err, deletedRecord) => {
        if (err || deletedRecord == null) {
            return res.status(400).json({ success: false, message: "Something went wrong" })
        } else {
            res.status(201).json({ "message": "Review removed" })
        }
    })
});

module.exports = router;