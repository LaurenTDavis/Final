// Requires \\
var express = require('express');
var bodyParser = require('body-parser');

// Connect to DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/final')

// Auth Requires
var session = require('express-session');
var passport = require('passport');

var passportConfig = require('./config/passport'); 

var userCtrl = require('./controllers/userCtrl')

// Create Express App Object \\
var app = express();

// Session Setup
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));

// Hook in passport to the middleware chain
app.use(passport.initialize());

// Hook in the passport session management into the middleware chain.
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes \\
var authenticationController = require('./controllers/authentication');

// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);

// This route is designed to send back the logged in user (or undefined if they are NOT logged in)
app.get('/api/me', function(req, res){
	res.send(req.user)
})
app.get('/api/me/:username', userCtrl.findUser)


// app.use(passportConfig.ensureAuthenticated);

app.get('/', function(req, res){
  res.sendFile('/html/home.html', {root : './public'})
});



// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

});