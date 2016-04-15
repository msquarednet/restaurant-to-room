/*global angular*/
(function() {
  'use strict';

  angular
    .module('app')
    .controller('RestaurantsController', RestaurantsController);

  // RestaurantsController.$inject=['$http'];
  RestaurantsController.$inject= ['api']; //apiFactory Service from api-services.js
  
  function RestaurantsController(api) {
    //this.data = 'the data';     //use  {{vm.data}} in the view
    var vm = this;
    
    // $http.get('/orders/api/restaurants')
    //   .then(function(response) {
    //     vm.restaurants = response.data;
    //   }, function(reason) {
    //     console.log(reason);
    //   })
    //   .catch(function(err) {
    //     console.log(err); //catch so that promise is always resolved
    //   });
    
    api.getRestaurants()
      .then(function(data) {
        vm.restaurants = data;
      });
  }
}());