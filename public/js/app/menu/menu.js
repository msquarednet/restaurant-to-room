/*global angular*/
(function() {
  'use strict';
  
  angular
    .module('app')
    .controller('MenuController', MenuController);
    
  MenuController.$inject = ['api', '$routeParams', 'ngDialog', '$scope', '$location'];
  
  function MenuController(api, $routeParams, ngDialog, $scope, $location) {
    var vm = this;
    vm.items = [];
    
    api.getRestaurantDetails($routeParams.restId)
      .then(function(data) {
        vm.restaurant = data;
      });
      
    vm.viewItem = function(item) {
      vm.activeItem = item;
      vm.activeItem.options = [];
      
      ngDialog.open({
        template: 'item.html',  //either path, or script ID (latter)
        className: 'ngdialog-theme-default', 
        scope: $scope
      });
    }
    
    vm.toggleOption = function(o) {
      var index = vm.activeItem.options.indexOf(o);
      if (index>-1) {vm.activeItem.options.splice(index,1)}
      else {vm.activeItem.options.push(o)}
    }
    
    vm.addItem = function(item) {
      var newItem = {id:item.id, name:item.name, price:item.price};
      if (item.options.length>0) {
        newItem.options = item.options.map(function(item) {
          return {id:item.id, name:item.name, price:item.price};
        });
      }
      vm.items.push(newItem);
      ngDialog.close();
      console.log(vm.items);
    }
    
    vm.cancel = function() {ngDialog.close()};
    
    vm.checkout = function() {
      var food = {
        restId: $routeParams.restId,
        restName: vm.restaurant.name,
        items: vm.items
      };
      api.createOrder(food)
        .then(function(data) {
          if (data.success) {$location.url('/payment')}
          else {alert('Order NOT created! Uh-oh.')}
        });
    }
  }
  
}());