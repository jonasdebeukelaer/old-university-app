'use strict';

/**
 * @ngdoc filter
 * @name yomantutApp.filter:capitalise
 * @function
 * @description
 * # capitalise
 * Filter in the yomantutApp.
 */
angular.module('unisalad')
  .filter('capitalise', function() {
    return function(input) {
    	if (input != undefined) {
      	return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
		  } else {
		  	return '';
  		}
    }
});
