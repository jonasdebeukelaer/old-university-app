'use strict';

/**
 * @ngdoc function
 * @name yomantutApp.controller:AddpostCtrl
 * @description
 * # AddpostCtrl
 * Controller of the yomantutApp
 */
angular.module('unisalad')
  .controller('AddpostCtrl', [ '$scope', '$location', 'currentList', function ($scope, $location, currentList) {

  	$scope.list = currentList.list;

  	if ($scope.list.label === 'tickets') {
  		console.log('adding ticket');
  		$scope.ticket = true;
  	} else if ($scope.list.label === 'lifts') {
  		console.log('adding lift');
  		$scope.lift = true;
  	} else if ($scope.list.label === 'houses') {
  		console.log('adding housey');
  		$scope.house = true;
  	} else if ($scope.list.label === 'misc') {
  		console.log('adding misc');
  		$scope.misc = true;
  	} else if ($scope.list.label === 'sale') {
  		console.log('adding item for sale');
  		$scope.sale = true;
  	};

    $scope.possibleNumber = [1, 2, 3, 4, 5, 6];
    $scope.numberOfItems = 1;
    $scope.post = {
    	ticket: '',
    	numberOfItems: 1,
    	cost: '',
    	location: '',
    	contact: {
        call: true,
    		text: true,
    		email: true
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
