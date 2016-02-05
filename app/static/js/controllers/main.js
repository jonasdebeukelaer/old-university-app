'use strict';

angular.module('unisalad')
  .controller('MainCtrl', ['$scope', 'localStorageService', '$location', function ($scope, localStorageService, $location) {
    $scope.pageClass = 'page-main';
    var viewHeight = $(window).height();
    var cardHeight = $('.container-card').height()
    $('.container-card').css('margin-top', Math.floor(0.5*(viewHeight-cardHeight-120)))


  	$scope.universities = ['Imperial College London', 'Nottingham University', 'Leeds University', 'Exeter University', 'Oxford University'];
  	$scope.uniSelected = function () {
  		console.log('User selected ' + $scope.university);
      localStorageService.set('uni', $scope.university);
	};
	$scope.goToSign = function(sign) {
		localStorageService.set('sign', sign);
		$location.path('do/login');
	}

  $scope.loadUniversities = function () {
    $http({
      method: 'GET',
      url: '/universities'
    }).then(function successCallback(response) {
        console.log("universities loaded");
        $scope.universities = reponse;
    }, function errorCallback(response) {
        alert("Error loading universities: " + response);
    });
  }
  }]);