'use strict';

angular.module('unisalad')
  .controller('LoginCtrl', ['$scope', '$http', 'localStorageService', '$location', function ($scope, $http, localStorageService, $location) {
    var init = function () {
      $scope.pageClass = 'page-login';
      var viewHeight = $(window).height();
      var cardHeight = $('#loginContainer').height();
      $('#loginContainer').css('margin-top', Math.max(0, Math.floor((viewHeight-cardHeight)/2))-64);
    }


    $scope.login = {
        email: "",
        password: ""
    }

    $scope.login = function () {

        var loginData = {
            email: $scope.login.email,
            password: $scope.login.password
        }

        $http({
          method: 'POST',
          data: JSON.stringify(loginData),
          url: 'http://localhost:5000/login'
        }).then(function successCallback(response) {
            console.log("HTTP: logged in successfully")
            console.log(response.data)
            $location.path('app/general');
        }, function errorCallback(response) {
            console.log("HTTP: logged in failed")
            if (response.data) {console.log(response.data.errorMessage)}
            else {console.log(response)}
        });
    }

    init()
  }]);
