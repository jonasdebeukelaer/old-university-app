'use strict';

angular.module('unisalad')
  .controller('GeneralCtrl', ['$scope', '$http', 'userData', '$cookies', function ($scope, $http, userData, $cookies) {
  	//in future load splash image instead of hiding everything
  	$('#splashScreen').fadeOut('3000', function () {
  		$('#rootRoot').css("visibility", "visible");
  	});
  	  
  }]);
