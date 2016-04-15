module.exports = function() {
  var passport = require('passport');
  var passportLocal = require('passport-local');
  var bcrypt = require('bcrypt');
  var UserSvc = require('../services/user-service');
  
  passport.use(new passportLocal.Strategy({usernameField: 'email'}, function(email, password, next) {
    UserSvc.findUserByEmail(email, function(err,user) {
      if (err) {
        return next(err);
      }
      // if (!user || user.password !== password) {
      //   return next(null, null);
      // }
      // next(null, user);
      if (!user) {
        return next(null, null);
      }
      bcrypt.compare(password, user.password, function(err,isSame) {
        if (err) {return next(err);}
        if (!isSame) {return next(null, null);}
        next(null, user);
      });
    })
  }));
  
  passport.serializeUser(function(user, next) {
    next(null, user.email);
  });
  
  passport.deserializeUser(function(email, next) {
    UserSvc.findUserByEmail(email, function(err, user) {
      next(err,user);
    })
  });  
};