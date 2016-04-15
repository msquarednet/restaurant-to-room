var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config');
var userSvc = require('../services/user-service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a USERS resource');
});
// GET /users/foo
// router.get('/foo', function(req, res, next) {
//   res.send('respond with a FOO resource');
// });
//GET /users/create
router.get('/create', function(req, res, next) {
  var vm = {title:'Create a User Account'}
  res.render('users/create', vm);
});
//POST /users/create
router.post('/create', function(req, res, next) {
  userSvc.addUser(req.body, function(err) {
    if (err) {
      //console.log(err);
      var vm = {
        title:'Create a User Account',
        reqbody: req.body,
        errstr: err
      }
    delete vm.reqbody.password; //optional
    return res.render('users/create', vm);  //return instead of else clause
    }
    //quick, login as...
    req.login(req.body, function(err) {
      if (err) {next(err);}
      res.redirect('/orders');  //success      
    });
    // res.redirect('/orders');  //success
  });
});

// router.post('/login', passport.authenticate('local'), function(req,res,next) {
//   res.redirect('/orders');
// });
router.post('/login', 
  function(req, res, next) {
    req.session.foobar = 'wtf';
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = config.cookieMaxAge;
    }
    next(); //important, or will get stuck!
  }, 
  passport.authenticate('local', {
  failureRedirect:'/', 
  successRedirect:'/orders', 
  failureFlash:'Invalid Creds'
}));

router.get('/logout', function(req,res,next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
