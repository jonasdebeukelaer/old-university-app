'use strict';

angular.module('unisalad')
  .controller('LoginCtrl', ['$scope', '$http', 'localStorageService', '$location', function ($scope, $http, localStorageService, $location) {
    $scope.pageClass = 'page-login';

    var viewHeight = $(window).height();
    var cardHeight = $('.container-card').height()
    $('.container-card').css('margin-top', Math.max(Math.floor(0.5*(viewHeight-cardHeight-420)), 5))


    $scope.login = {
        email: '',
        password: '',
        remember: false
    }

    $scope.signup = {
        email:"",
        forename:"",
        surname:"",
        password:"",
        number:"",
        universityId:""
    }

    $scope.university = localStorageService.get('uni');
    $scope.landingTo = localStorageService.get('sign');

    if ($scope.landingTo == 'in') {
    	$scope.selectedTab = 0;
    }else {
    	$scope.selectedTab = 1;
    };

    $scope.checkEmailFormat = function () {
        var correctFormat = false;

        console.log($scope.signup)
        var email = $scope.signup.email;
        console.log(email)
        if (email) {
            var emailDomain = email.split("@")[1].split(".")[0];
            switch($scope.university) {
                case "Imperial College London":
                    if (emailDomain == 'imperial') correctFormat = true;
                    break;
                case "Nottingham University":
                    if (emailDomain == 'nottingham') correctFormat = true;
                    break;
                case "Leeds University":
                    if (emailDomain == 'leeds') correctFormat = true;
                    break;
                case "Exeter University":
                    if (emailDomain == 'exeter') correctFormat = true;
                    break;
                case "Oxford University":
                    if (emailDomain == 'oxford') correctFormat = true;
                    break;
                default:
                    console.log("something wrong with email check!")
            }
        }


        var signUpEmail = $('#signupEmail');
        if (!signUpEmail.hasClass('md-input-invalid') && !correctFormat) {
            signUpEmail.addClass('md-input-invalid')
        } else if (signUpEmail.hasClass('md-input-invalid') && correctFormat) {
            signUpEmail.removeClass('md-input-invalid')
        }
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

    $scope.Login = function () {

        var encryptedDeets = $scope.login;

        $http({
          method: 'POST',
          data: encryptedDeets,
          url: '/login'
        }).then(function successCallback(response) {
            $location.path('app/general');
        }, function errorCallback(response) {
            alert("Error occured signing up:\n" + response);
        });
    }

    $scope.SignUp = function () {

        var encryptedSignUp = $scope.signup;

        $http({
          method: 'POST',
          data: encryptedSignUp,
          url: '/user/create'
        }).then(function successCallback(response) {
            $location.path('do/confirmationSent');
        }, function errorCallback(response) {
            alert("Error occured signing up:\n" + response);
        });
    }


  }]);
