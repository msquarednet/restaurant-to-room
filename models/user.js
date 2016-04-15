var mongoose = require('mongoose');
var userSvc = require('../services/user-service');

var userSchema = new mongoose.Schema({
  firstName: {type:String, required:'Please enter your firstName'},
  lastName: {type:String, required:'Please enter your lastName'},
  roomNumber: {type:Number, required:'Please enter your roomNumber', min:[100,'roomNumber must be greater than 100']},
  email: {type:String, required:'Please enter your email'},
  password: {type:String, required:'Please enter your password'},
  created: {type:Date, default:Date.now()}
});

userSchema.path('email').validate(function(value, next) {
  userSvc.findUserByEmail(value, function(err,user) {
    if (err) {
      console.log(err);
      return next(false);
    }
    next(!user);  //truthy, when user is 'not null'
  })
}, 'That email is already in use');

var User = mongoose.model('User', userSchema);


module.exports = {
  User: User
}