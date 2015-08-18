'use strict';

/**
 * @ngdoc function
 * @name yomantutApp.controller:AddpostCtrl
 * @description
 * # AddpostCtrl
 * Controller of the yomantutApp
 */
angular.module('unisalad')
  .controller('AddpostCtrl', [ '$scope', '$location', function ($scope, $location) {
    $scope.possibleNumber = [1, 2, 3, 4, 5, 6];
    $scope.numberOfTickets = 1;
    $scope.post = {
    	ticket: '',
    	numberOfTickets: 1,
    	cost: '',
    	location: '',
    	contact: {
    		email: true,
    		text: true,
    		facebook: true
    	}
	};
    /*
	var mapOptions = {
	  center: new google.maps.LatLng(52.948347, -1.181688),
	  zoom: 12,
	  streetViewControl: false,
	  mapTypeControl: false
	};

	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	var input = document.getElementById('searchTextField');
	var options = {
		componentRestrictions: {country: 'uk'}
	};

	var autocomplete = new google.maps.places.Autocomplete(input, options);
	autocomplete.bindTo('bounds', map);
	*/
	$scope.add = function () {
		$location.path('/listview');
		//send info to server
	};

  }]);
