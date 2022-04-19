var express = require('express');
var router = express.Router();
var Season = require('../models/seasons');


router.post('/api/seasons', function (req, res, next) {
    var newSeason = new Season({
        showName: req.body.showName,
        seasonNumber: req.body.seasonNumber,
        episodes: req.body.episodes
    });
    newSeason.save((err, doc) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Already exists"
            });
        }
        res.status(200).json({
            succes: true,
            newSeason: doc.populate('episodes')
        });
    });
});

//get one specific season based on id
router.get('/api/seasons/:id', function (req, res, next) {
    var id = req.params.id;
    Season.findById(id, function (err, season) {
        if (err) {
            return next(err);
        }
        if (season == null) {
            return res.status(404).json(
                { "message": "Season not found" });
        }
        res.status(200).json({ succes: true, season })
    }).populate('episodes');
});

router.get('/api/seasons', function (req, res, next) {
    Season.find(function (err, seasons) {
        res.json({ seasons })
    })
})

// Add episode to season
router.patch('/api/seasons', function (req, res) {

    var seasonObjectId = req.body.seasonObjectId;
    var episodeObjectId = req.body.episodeObjectId;

    Season.findOneAndUpdate({ _id: seasonObjectId },
        { $addToSet: { episodes: { $each: episodeObjectId } } }, { new: true }, (err, season) => {
            if (err || season == null) {
                return res.status(404).json({ message: "Season not found" });
            }
            return res.status(201).json({ message: "Added episode to season!", season });

        });
});

// Delete season based on id
router.delete('/api/seasons/:id', function (req, res) {
    var seasonId = req.params.id;
    Season.findByIdAndDelete(seasonId, (err, deletedRecord) => {
        if (err || deletedRecord == null) {
            return res.status(400).json({ success: false, message: "Something went wrong" })
        } else {
            res.status(201).json({ "message": "Season removed" })
        }
    })
});

module.exports = router;