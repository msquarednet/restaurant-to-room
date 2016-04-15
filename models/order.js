var mongoose = require('mongoose');


var orderSchema = new mongoose.Schema({
  refnum: String, 
  created: {type:Date, default:Date.now()},
  user: {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    roomNumber: Number
  },
  food: {
    restId: String,
    restName: String, 
    items: []
  }
});

var Order = mongoose.model('Order', orderSchema);


module.exports = {
  Order: Order
}