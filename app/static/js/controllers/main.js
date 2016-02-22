'use strict';

angular.module('unisalad')
  .controller('MainCtrl', ['$scope', 'localStorageService', '$location', '$http', function ($scope, localStorageService, $location, $http) {
    $scope.pageClass = 'page-main';
    var viewHeight = $(window).height();
    var cardHeight = $('#container')
    console.log(viewHeight)
    console.log(cardHeight)
    $('.container-card').css('margin-top', Math.max(0, Math.floor((viewHeight-cardHeight)/2)) + 64)


    var universitySelected = false;
    $scope.email = "";
    $scope.domain = "@";

  	$scope.uniSelected = function () {
      localStorageService.set('uni', $scope.university);
      $scope.domain = '@' + $scope.university.toString() + '.ac.uk'
      universitySelected = true;
  	};

    $scope.moveToEmailField = function () {
      if (universitySelected && $scope.email !== "") {
        $scope.focusOnEmail();
      } else {
        console.log("nope")
      }
    }

  	$scope.signUp = function() {
      if (universitySelected && $scope.email != "") {
  		  $location.path('do/login');
      } else if (universitySelected) {
        alert("Please enter your university email")
      } else {
        alert("Please select a university")
      }
  	}

    $scope.focusOnEmail = function() {
      $('#emailField').focus();
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