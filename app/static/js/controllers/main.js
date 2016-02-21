'use strict';

angular.module('unisalad')
  .controller('MainCtrl', ['$scope', 'localStorageService', '$location', '$http', function ($scope, localStorageService, $location, $http) {
    $scope.pageClass = 'page-main';
    var viewHeight = $(window).height();
    var cardHeight = $('.container-card').height()
    $('.container-card').css('margin-top', Math.min(50, Math.floor(0.5*(viewHeight-cardHeight-120))))

  	$scope.uniSelected = function () {
      localStorageService.set('uni', $scope.university);
      $scope.domain = '@' + $scope.university.toString() + '.ac.uk'
  	};

  	$scope.goToSign = function(sign) {
  		localStorageService.set('sign', sign);
  		$location.path('do/login');
  	}

    var loadUniversities = function () {
      $http({
        method: 'GET',
        url: 'http://127.0.0.1:5000/universities'
      }).then(function successCallback(response) {
          console.log("HTTP: universities loaded successfully");
          $scope.universities = response.data;
      }, function errorCallback(response) {
          alert("HTTP: Error loading universities")
          console.log("response:\n" + JSON.stringify(response))
      });
    }

    loadUniversities();
  }]);