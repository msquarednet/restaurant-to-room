var express = require('express');
var router = express.Router();
var authuser = require("../auth/authuser");

var orderSvc = require('../services/order-service');

/* GET Orders page. */
// GET /orders
router.get('/', authuser, function(req, res, next) {
  var vm = {
    title: 'Place an Order',
    firstName: req.user ? req.user.firstName : null,
    foobar: req.session.foobar
  };
  res.render('orders/index', vm);
});


/////////////////////
//API
/////////////////////
router.get('/api/restaurants', authuser, function(req, res, next) {
  orderSvc.getRestaurants(function(err, restaurants) {
    if (err) {
      return res.status(500).json({error:'Failed to retrieve restaurants'});
    }
    res.send(restaurants);  //res.send(...) is okay too
  }); 
  // var deliveryUrl = 'http://sandbox.delivery.com/merchant/search/delivery/542 E 79th St, 10075'
  // router.get(deliveryUrl, function(req, res, next) {});
  //res.send(['aaa', 'bbb', 'ccc', 'ddd']);
});

router.get('/api/restaurant-details/:restId', function(req, res, next) {
  orderSvc.getRestaurantDetails(req.params.restId, function(err, details) {
    if (err) {
      return res.status(500).json({error:'Failed to retrieve restaurant details for '+req.params.restId});
    }
    res.send(details);
  }); 
});

router.post('/api/create-order', authuser, function(req,res,next) {
  orderSvc.createOrder(req.user._doc,req.body, function(err, orderId) {
    if (err) {
      return res.status(500).json({error:'Failed to create order'});
    }
    req.session.order_id = orderId;
    res.json({success:true});
  });  
});

router.post('/api/place-order', authuser, function(req,res,next) {
  orderSvc.placeOrder(req.session.order_id, req.body, function(err,result) {
    if (err) {
      return res.status(500).json({error:'Failed to place order'});
    }
    res.json(result);    
  });
});

module.exports = router;
