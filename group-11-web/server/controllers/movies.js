var express = require('express');
var router = express.Router();
var Movie = require('../models/movies');

router.post('/api/movies', function (req, res) {
    const movieName = req.body.movieName
    var newMovie = new Movie({
        movieName: movieName,
        movieStory: req.body.movieStory,
        movieReleaseDate: req.body.releaseDate,
        movieGenre: req.body.genre,
        movieLength: req.body.movieLengthMinutes,
        movieDirector: req.body.director,
        movieActors: req.body.actors,
        poster: req.body.poster
    });

    Movie.findOne({ movieName: newMovie.movieName },
        function (err, movie) {
            if (movie != null) {
                return res.status(403).json({ auth: false, message: "Already exists" });
            }
            newMovie.save((err, doc) => {
                if (err) {
                    return res.status(400).json({ success: false, message: "Failed to save movie" });
                }
                res.status(200).json({
                    succes: true,
                    newMovie: doc
                });
            });
        });
});

//get all movies
router.get('/api/movies/', function (req, res, next) {
    var sortByName = req.query.sortByName
    var sortByGenre = req.query.sortByGenre
    if (sortByGenre) {
        Movie.find(function (err, movies) {
            if (err) {
                return next(err);
            }
            else {
                movies.sort((a, b) => a.movieGenre.localeCompare(b.movieGenre))
                res.json({ "Movies": movies })
            }
        })
    } else if (sortByName) {
        Movie.find({ movieName: sortByName }, function (err, movie) {
            if (movie === null) {
                return res.status(404).json(
                    { "message": "Movie not found" });
            } else if (err) {
                return (err);
            } else {
                res.json(movie);
            }
        });
    } else {
        Movie.find(function (err, movies) {
            if (err) {
                return next(err);
            } else {
                res.json({ "Movies": movies });
            }

        });
    }
});

//get one specific movie based on id
router.get('/api/movies/:id', function (req, res, next) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        if (err) {
            return next(err);
        }
        if (movie == null) {
            return res.status(404).json(
                { "message": "Movie not found" });
        }
        res.json(movie);
    }).populate('reviews');
});

router.delete('/api/movies/:id', function (req, res) {
    movieIdToDelete = req.params.id
    Movie.findByIdAndDelete(movieIdToDelete, (err, deletedRecord) => {
        if (err || deletedRecord == null) {
            return res.status(400).json({ success: false, message: "Something went  wrong" })
        } else {
            res.status(201).json({ "message": "Movie removed" })
        }
    })

});

module.exports = router; 