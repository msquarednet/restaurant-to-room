/*global angular*/
(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$routeProvider']; //can inject dependencies like this when using a separate function (below)

  function config($routeProvider) {
    $routeProvider
      .when('/restaurants', {
        templateUrl: '/js/app/restaurants/restaurants.html',
        controller: 'RestaurantsController',
        controllerAs: 'vm'
      })
      .when('/menu/:restId', {
        templateUrl: '/js/app/menu/menu.html',
        controller: 'MenuController',
        controllerAs: 'vm'
      })
      .when('/payment', {
        templateUrl: '/js/app/payment/payment.html',
        controller: 'PaymentController',
        controllerAs: 'vm'        
      })
      .when('/confirmation', {
        templateUrl: '/js/app/confirmation/confirmation.html'
      });  
  }
}());