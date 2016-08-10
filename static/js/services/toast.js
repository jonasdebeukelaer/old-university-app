'use strict';

angular.module('unisalad')
  .service('toast', ['$mdToast', function ($mdToast) {
  	this.displayToast = function (message) {
  		$mdToast.show(
      	$mdToast.simple()
	        .content(message)
	        .position('bottom')
	        .hideDelay(1200)
      ); 
  	}
  }]);