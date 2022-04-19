var express = require('express');
var router = express.Router();
var TvShow = require('../models/tvShows');
var Season = require('../models/seasons')

router.post('/api/tvshows', function (req, res) {
    var newTvShow = new TvShow({
        tvShowName: req.body.name,
        tvShowDescription: req.body.story,
        tvShowReleaseDate: req.body.releaseDate,
        tvShowdirector: req.body.director,
        tvShowcast: req.body.cast,
        seasons: req.body.seasons,
        poster: req.body.poster
    });

    TvShow.findOne({ tvShowName: newTvShow.tvShowName }, (err, showDoc) => {
        if (showDoc != null) {
            return res.status(403).json({ auth: false, message: "Already exists" });
        }
        newTvShow.save((err, doc) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to save tv show"
                });
            }
            res.status(200).json({
                succes: true,
                newTvShow: doc
            });
        });
    });
});

//get all tv shows
router.get('/api/tvshows', function (req, res, next) {
    TvShow.find(function (err, tvShow) {
        if (err) {
            return next(err);
        }
        res.json({ "Shows": tvShow });
    }).populate('seasons');
});

//get episodes in a tv show based on tv show and season id

router.get('/api/tvshows/:tvShowId/seasons/:seasonId', function (req, res, next) {
    var tvshowid = req.params.tvShowId
    var seasonid = req.params.seasonId
    TvShow.findById(tvshowid, function (err, tvShow) {
        if (!err || tvShow != null) {
            Season.findById(seasonid, function (err, season) {
                if (err || season == null) { return res.status(404).json(err) }
                else return res.status(200).json(season)
            }).populate('episodes')
        }
    })
})

//get tv shows based on name
router.get('/api/tvshows', function (req, res, next) {
    var reqMedia = req.body.name
    TvShow.find({ tvShowName: reqMedia }, function (err, tvShow) {
        if (err) {
            return next(err);
        }
        if (tvShow == null) {
            return res.status(404).json(
                { "message": "Tv show not found" });
        }
        res.status(200).json({ succes: true, tvShow });
    }).populate('seasons');
});

//get one specific tv show based on id
router.get('/api/tvshows/:id', function (req, res, next) {
    var id = req.params.id;
    TvShow.findById(id, function (err, tvShow) {
        if (err) {
            return next(err);
        }
        if (tvShow == null) {
            return res.status(404).json(
                { "message": "Tv show not found" });
        }
        res.status(200).json({ tvShow })
    }).populate('seasons').populate('reviews');
});

// Delete tvshow based on id
router.delete('/api/tvshows/:id', function (req, res) {
    var tvShowToRemove = req.params.id
    TvShow.findByIdAndDelete(tvShowToRemove, (err, deletedRecord) => {
        if (err || deletedRecord == null) {
            return res.status(400).json({ success: false, message: "Something went  wrong" })
        } else {
            res.status(201).json({ "message": "Tv show removed" })
        }
    })
});

module.exports = router; 