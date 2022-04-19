var express = require('express');
var router = express.Router();
var Episode = require('../models/episodes');

router.post('/api/episodes', function (req, res) {

    var newEpisode = new Episode({
        episodeNr: req.body.episodeNr,
        episodeName: req.body.episodeName,
        episodeLength: req.body.episodeLength,
    });

    Episode.findOne({ episodeName: newEpisode.episodeName },
        function (err, episode) {
            if (episode != null) {
                return res.status(403).json({ auth: false, message: "Already exists" });
            }
            newEpisode.save((err, doc) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: "Failed to save episode"
                    });
                }
                res.status(200).json({
                    succes: true,
                    newEpisode: doc
                });
            });
        });
});

//get one specific episode based on id
router.get('/api/episodes/:id', function (req, res, next) {
    var id = req.params.id;
    Episode.findById(id, function (err, episode) {
        if (err) {
            return next(err);
        }
        if (episode == null) {
            return res.status(404).json(
                { "message": "Episode not found" });
        }
        res.json({ episode: episode });
    })
});

router.get('/api/episodes', function (req, res, next) {
    Episode.find(function (err, episode) {
        res.json({ episode })
    })
})

router.delete('/api/episodes/:id', function (req, res) {
    var episodeId = req.params.id;
    Episode.findByIdAndDelete(episodeId, (err, deletedRecord) => {
        if (err || deletedRecord == null) {
            return res.status(400).json({ success: false, message: "Something went wrong" })
        } else {
            res.status(201).json({ "message": "Episode removed" })
        }
    })
});

module.exports = router;

