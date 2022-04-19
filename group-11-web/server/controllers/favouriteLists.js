var express = require('express');
var router = express.Router();
var FavouriteList = require('../models/favouriteLists');
var Users = require('../models/users');
var Movie = require('../models/movies');
var tvShow = require('../models/tvShows');

router.post('/api/favouriteList', function (req, res, next) {
    var reqEmail = req.body.userEmail;

    var newFavouriteList = new FavouriteList({
        userEmail: req.body.userEmail,
        favouriteListName: req.body.favouriteListName,
        favouriteListNr: req.body.favouriteListNr,
        favouriteObjectsInList: req.body.favouriteObjectsInList,
        tvShows: req.body.tvShows,
        movie: req.body.movies
    });
    newFavouriteList.save((err, doc) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: "Failed to save favourite list"
            });
        }
        Users.findOneAndUpdate({ userEmail: reqEmail }, { recList: newFavouriteList }, function (err, user) {
            if (err) return res.status(400).json({ message: "Could not find user" })
        })
        res.status(200).json({
            succes: true,
            newFavouriteList: doc
        });
    });
});

//get all favourite list
router.get('/api/favouritelist', function (req, res, next) {
    FavouriteList.find({}, function( err, favouritelist) {
        if(err || favouritelist == null) {
            res.status(404).json({message: "Could not find favouritelists"})
        }
        res.json(favouritelist)
    })
});

//get favourite list by name
router.get('/api/favouritelist/:id', function (req, res, next) {

    var reqId = req.params.id
    console.log(reqId)
    FavouriteList.findById(reqId, function (err, favouriteList) {
        console.log(favouriteList)
        if (err) {
            return next(err);
        }
        if (favouriteList == null) {
            return res.status(404).json(
                { "message": "Favourite List not found" });
        }
        res.status(200).json({ succes: true, favouriteList });
    });
});





//add movie
router.patch('/api/favouritelist', function (req, res) {
    var movieId = req.query.movie
    var listID = req.query.id
    Movie.findById(movieId, (err, doc) => {
        if (err || doc == null) {
            tvShow.findById(movieId, (err, doc) => {
                if (err || doc == null) {
                    return res.status(404).json({ message: "That is not a movie or tvshow" })
                } else {
                    FavouriteList.findByIdAndUpdate(listID, { $addToSet: { tvShow: movieId } }, { new: true }, (err, doc) => {
                        return res.status(201).json({ message: "Added movie to favourite list!", doc });
                    });
                }
            })
        } else {
            FavouriteList.findByIdAndUpdate(listID, { $addToSet: { movie: movieId } }, { new: true }, (err, doc) => {
                return res.status(201).json({ message: "Added movie to favourite list!", doc });
            });
        }
    })
});

//remove favourite list based on id
router.delete('/api/favouritelist/:id', function (req, res) {
    var favouriteListId = req.params.id;
    FavouriteList.findByIdAndDelete(favouriteListId, (err, deletedRecord) => {
        if (err || deletedRecord == null) {
            return res.status(400).json({ success: false, message: "Something went wrong" })
        } else {
            res.status(201).json({ success: true, message: "Favourite list removed" })
        }
    })
});



module.exports = router;
