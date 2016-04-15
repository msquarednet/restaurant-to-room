var express = require('express');
var path = require('path'); //comes with express, not in node_modules folder
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var connectFlash = require('connect-flash');
var connectMongo = require('connect-mongo');

var config = require('./config');
var routes = require('./routes/index');
var users = require('./routes/users');
var orders = require('./routes/orders');

var MongoStore = connectMongo(expressSession);

var passportConfig = require('./auth/passport-config');
passportConfig();

mongoose.connect(config.mongoUri);

var app = express();
app.set('production', process.env.NODE_ENV==='production')	//only set in heroku


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  secret: 'abracadabra',      //sign cookie to prevent tampering
  saveUninitialized: false,   //create a session if nothing has bees stored in it, yet
  resave: false,               //resave a session that hasn't been modified
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/orders', orders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {} //empty obj
  });
});


module.exports = app;
