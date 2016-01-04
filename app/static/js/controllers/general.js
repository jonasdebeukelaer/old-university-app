'use strict';

angular.module('unisalad')
  .controller('GeneralCtrl', ['$scope', function ($scope) {
  	//in future load splash image instead of hiding everything
  	$('#splashScreen').fadeOut('3000', function () {
  		$('#rootRoot').css("visibility", "visible");
  	});
  }]);
