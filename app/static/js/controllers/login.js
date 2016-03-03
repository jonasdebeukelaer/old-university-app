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
        email: '',
        password: ''
    }

    $scope.signup = {
        email:"",
        forename:"",
        surname:"",
        password:"",
        number:"",
        universityId:""
    }


    $scope.comparePasswords = function () {
        var confirmPassword = $('#confirmPassword');
        if (confirmPassword.hasClass('md-input-invalid')) {
            if ($scope.signup.password == $scope.passwordConfirm) {
                confirmPassword.removeClass('md-input-invalid');
            }
        } else {
            if ($scope.signup.password !== $scope.passwordConfirm) {
                confirmPassword.addClass('md-input-invalid');
            }    
        }
    }

    $scope.login = function () {

        var loginData = {
            'username': $scope.login.username,
            'password': $scope.login.password
        }

        $http({
          method: 'POST',
          data: JSON.stringify(loginData),
          url: 'http://localhost:5000/user/login'
        }).then(function successCallback(response) {
            console.log("HTTP: logged in successfully")
            $location.path('app/general');
        }, function errorCallback(response) {
            console.log("HTTP: logged in failed")
            console.log(response)
            alert("Error occured signing up:\n" + response);
        });
    }

    $scope.SignUp = function () {

        var loginData = {
            'username': $scope.login.username,
            'password': 'blah'
        }

        $http({
          method: 'POST',
          data: loginData,
          url: '/user/create'
        }).then(function successCallback(response) {
            $location.path('do/confirmationSent');
        }, function errorCallback(response) {
            alert("Error occured signing up:\n" + response);
        });
    }


    init()
  }]);
