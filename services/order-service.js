//var DeliveryStrategy = require('passport-delivery.com').Strategy; //crap
var config = require('../config');
var Order = require('../models/order').Order;

//var api = ....//crap

var rarr = [
   {id:1, na:'Wendys', cu:'cheap, unhealthy, effective', is_delivering:1}
  ,{id:2, na:'McDonalds', cu:'cheap, unhealthy, effective', is_delivering:0}
  ,{id:3, na:'Burger King', cu:'cheap, unhealthy, effective', is_delivering:1}
];

exports.getRestaurants = function(next) {
  var r = rarr;
  r = r.filter(function(rest) {
    return rest.is_delivering;
  });
  next(null, r);
}

exports.getRestaurantDetails = function(restId, next) {
  //...
  var details = {
    name: 'Mr. Butcher\'s Steakhouse',
    menu: [ //an array of categories
      {
        name: 'Appetizers',
        children: [ //array of menu items
            {id: 1, name: 'Greasy Grimy Gopher Guts', price: '6.99', descrip: 'Oh, the greasy-ness! The grimy-ness!!!', children: 
              [
                {
                  name: "Appetizer Add-Ons", children: 
                    [
                      {id:100, name:'Extra Greasiness', price:'1.00'},
                      {id:101, name:'Extra Griminess', price:'2.00'},
                      {id:102, name:'Extra Gutsiness', price:'2.50'}
                    ]
                }
              ]
            },
            {id: 2, name: 'French-fried Parakeet', price: '5.99', descrip: 'Tasty, Toasty, Birdie!'}
          ],
      },
      {
        name: 'Beers',
        children: [ //array of menu items
            {id: 3, name: 'Alesmith, Speedway Stout', price: '7.99', descrip: 'Best Stout ever! ABV:12%'},
            {id: 4, name: 'Lagunitas, Little Sumpin Extra', price: '6.99', descrip: 'More than just a little sumpin!'}
          ],
      }
    ]
    
  };
  next(null, details);
}

exports.createOrder = function(user, food, next) {
  var order = new Order({
    user:user,
    food:food
  });
  order.save(function(err, savedOrder) {
    if (!err) {
      return next(null, savedOrder._id);
    }
    next(err);
  });
}

//just a sychronous helper function, not really a 'service' function. ah well.
exports.prepareTray = function(items) {
  var tray = [];
  for (var i=0; i<items.length; i++) {
    var trayItem = items[i].id + '/1';
    if (items[i].options) {
      for (var j=0; j<items[i].options.length; j++) {
        trayItem += ',' + items[i].options[j].id;
      }
    }
    tray.push(trayItem);
  }
  return tray.join('+');
}

exports.placeOrder = function(order_id, card, next) {
  Order.findOne({_id: order_id}, function(err,order) {
    if (err) {
      console.log(err);
      return next(err); 
    }
    var args = {
      rid: order.food.redtId,
      em: order.user.email,
      tray: {},//self.prepareTray(order.food.Items),
      first_name: order.user.firstName,
      last_name: order.user.lastName,
      fake_addr: 'blah',
      card_name: order.user.firstName + ' ' + order.user.lastName,
      fake_card_addr: "blah2",
      delivery_date: 'ASAP'
    };
    next(null, {success: true});  //skipping actual placing of order
    // api.order_guest(args, function(err, result) {
    //   if (!err) {
    //     console.log(result);
    //     order.refnum = result.refnum;
    //     return order.save(function(err) {
    //       if (err) {
    //         console.log(err);
    //         //order placed externally, but was not saved to mongoDB
    //       }
    //       next(null, {success: true});
    //     });
    //   }
    //   console.log(err);
    //   next(err, {success: false});
    // })
  })
}