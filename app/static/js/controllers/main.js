'use strict';

/**
 * @ngdoc function
 * @name yomantutApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomantutApp
 */

angular.module('unisalad')
  .controller('MainCtrl', function ($scope, localStorageService, $location) {
    $scope.pageClass = 'page-main';

  	$scope.universities = ['Imperial College London', 'Nottingham University', 'Leeds University', 'Exeter University', 'Oxford University'];
  	$scope.uniSelected = function () {
  		console.log('User selected ' + $scope.university);
      	localStorageService.set('uni', $scope.university);
	};
	$scope.goToSign = function(sign) {
		localStorageService.set('sign', sign);
		$location.path('/login');
	}
  });