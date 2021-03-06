var passport = require('passport');
var User = require('../models/user');

var performLogin = function(req, res, next, user){
  req.login(user, function(err){
    if(err) return next(err);
    return res.redirect('/');
  });
};

var authenticationController = {
  login: function(req, res){
   res.sendFile('/html/login.html', {root : './public'})
  },

  processLogin: function(req, res, next){
    var authFunction = passport.authenticate('local', function(err, user, info){

      if(err) return next(err);

      if(!user) {
		    return res.send({error: 'Error logging in. Please try again.'});
      }

      performLogin(req, res, next, user);
    });

    authFunction(req, res, next);
  },

  processSignup: function(req, res, next){
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name      : req.body.name,
      picture   : req.body.picture
    });

    user.save(function(err, user){
      if(err) {
        if(err.code === 11000){
		      return res.send({error : 'This user already exists.'})
        }
		else{
		  return res.send({error : 'An error occured, please try again'})
			
		}  
      }

      performLogin(req, res, next, user);
    });
  },

  // Handle logout requests
  logout: function(req, res){
    req.logout();
    res.redirect('/');
  }
};

module.exports = authenticationController;