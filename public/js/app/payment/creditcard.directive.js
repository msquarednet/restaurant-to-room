/*global angular*/
(function() {
  'use strict';
  
  angular
    .module('app')
    .directive('creditCard', creditCard); //credit-card in HTML
  
  
  function creditCard() {
    return {
      require: 'ngModel', 
      link: function(scope,element,attrs,ngModel) {
        ngModel.$validators.creditCard = function(modelValue, viewValue) {
          if (!viewValue) {return true;}
          //return pass/fail luhn check (https://gist.github.com/shirtlesskirk/2134376...nope, used other)
        	if (/[^0-9-\s]+/.test(viewValue)) return false;
        	var nCheck = 0, nDigit = 0, bEven = false;
        	viewValue = viewValue.replace(/\D/g, "");
        	for (var n = viewValue.length - 1; n >= 0; n--) {
        		var cDigit = viewValue.charAt(n),
        			  nDigit = parseInt(cDigit, 10);
        		if (bEven) {
        			if ((nDigit *= 2) > 9) nDigit -= 9;
        		}
        		nCheck += nDigit;
        		bEven = !bEven;
        	}
        	return (nCheck % 10) == 0;
        }
      }
    };
  }
    
  
}());