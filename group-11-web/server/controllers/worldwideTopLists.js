var express = require('express');
var router = express.Router();
var TopList = require('../models/worldwideTopLists');
var Movies = require('../models/movies');
var TvShows = require('../models/tvShows');

// Creates an empty toplist
router.post('/api/worldwideTopLists', function (req, res) {
    var newTopList = new TopList({});
    newTopList.save();
    return res.status(200).json({ "message": "Created Toplist" })
})

// Get toplist
router.get('/api/worldwideTopLists', function (req, res) {
    TopList.find({}, function (err, toplist) {
        if (err || toplist == null) {
            console.log(err)
            return res.status(400).json({ "message": "Toplist not found" })
        }
        return res.status(200).json({ "Toplist": toplist })
    }).populate('tvshows').populate('movies')
})

// Add movie and tvshow to toplist
router.patch('/api/worldwideTopLists', function (req, res) {
    var reqMedia = req.body.mediaName;

    Movies.findOne({ movieName: reqMedia }, function (err, movie) {
        if (err || movie == null) {
            TvShows.findOne({ tvShowName: reqMedia }, function (err, tvshow) {
                if(err || tvshow == null) {
                    res.json({ message: "Not a movie or tvshow" })
                } else {
                    TopList.findOneAndUpdate({}, { $addToSet: { tvshows: tvshow } }, { new: true }, (err, toplist) => {
                        if (err || toplist == null) {
                            res.json({ message: "Toplist not found" })
                        } else {
                            res.json({ toplist })
                        }
                    })
                }
            })
        } else {
            TopList.findOneAndUpdate({}, { $addToSet: { movies: movie } }, { new: true }, (err, toplist) => {
                if (err || toplist == null) {
                    res.json({ message: "Toplist not found" })
                } else {
                    res.json({ toplist })
                }
            })
        }
    })
})

// Deletes by id
router.delete('/api/worldwideTopLists/:id', function (req, res) {
    var reqID = req.params.id
    TopList.findOneAndDelete({ _id: reqID }, function (err, toplist) {
        if (err || !toplist) { res.status(400) }
        res.status(201).json({ "message": "Toplist removed" })
    })
})

module.exports = router;