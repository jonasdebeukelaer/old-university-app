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

    $scope.postType = $scope.list.label;

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
    
	$scope.add = function () {
		$scope.toastAdded();
		$location.path('/' + currentList.list.label);
		//send info to server
	};

  }]);
