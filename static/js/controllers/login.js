'use strict';

angular.module('unisalad')
  .controller('LoginCtrl', ['$scope', '$http', '$localStorage', '$location', '$cookies', 'userData', 
                             function ($scope, $http, $localStorage, $location, $cookies, userData) {
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
          url: 'https://127.0.0.1:5000/api/login'
        }).then(function successCallback(response) {
            userData.hash = response.data.password
            userData.email = response.data.email
            userData.userId = response.data.id
            $cookies.put('token', response.data.token)
            $http.defaults.headers.common['token'] = response.data.token;
            $localStorage.token = response.data.token;
            console.log("HTTP: logged in successfully")
            console.log(response.data);
            $location.path('app/tickets');
        }, function errorCallback(response) {
            console.log("HTTP: logged in failed")
            if (response.data) {console.log(response.data.errorMessage)}
            else {console.log(response)}
        });
    }

    init()
  }]);
