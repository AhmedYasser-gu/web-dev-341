var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');


// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://dbFox:Yteamsmhmh619@cluster0.xym8o.mongodb.net/test?retryWrites=true&w=majority';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

//import controller
var userController = require('./controllers/users'); 
var movieController = require('./controllers/movies')
var episodeController = require('./controllers/episodes')
var seasonController = require('./controllers/seasons')
var tvShowController = require('./controllers/tvShows')
var favouriteListController = require('./controllers/favouriteLists')
var recommendationListController = require('./controllers/recommendationLists')
var worldwideTopListsController = require('./controllers/worldwideTopLists')
var reviewController = require('./controllers/reviews')
var signInController = require('./controllers/signin')
app.use(userController, movieController, episodeController, 
    seasonController, tvShowController, worldwideTopListsController, 
    favouriteListController, recommendationListController, 
    reviewController, signInController)

// Import routes
/*app.post('/api/createUser', function(req, res){
    res.json({'message':'Create User'});
});
app.delete('/api/deleteUser', function(req, res) {
    userController.deleteUser;
    res.json({'message': 'Delete User!'});
});
app.post('/api/signIn', function(req, res){ 
    userController.signIN;
    res.json({'message':'Sign In'});
});
app.patch('/api/editUserPassword', function(req, res){
    userController.editUserPassword;
    res.json({'message':'Modified Password'});
});

app.post('/api/addMovies', function(req, res){
    movieController.addMovies;
    res.json({'message':'Add Movies'}); 
});
app.delete('/api/deleteUser', function(req, res) {
    movieController.removeMovie;
    res.json({'message': 'Remove Movie!'});
});*/

app.get('/api', function(req, res) {
    res.json({'message':'This route is used for newman-wait that runs with the npm test command.'});
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Catch all non-error handler' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.get('/api', function(req, res) {
    res.json({'message':'This route is used for newman-wait that runs with the npm test command.'});
});
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
