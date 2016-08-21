'use strict';

angular.module('unisalad')
  .controller('MainCtrl', ['$scope', 'localStorageService', '$location', '$http', 'httpReq', function ($scope, localStorageService, $location, $http, httpReq) {
    var init = function () {
      $scope.pageClass = 'page-main';
      var viewHeight = $(window).height();
      var cardHeight = $('#signupContainer').height();
      $('#signupContainer').css('margin-top', Math.max(0, Math.floor((viewHeight-cardHeight)/2))-64);

      $('#emailSent').css({'top': viewHeight, 'min-height': cardHeight})
    }

    var correctEmailSent = false;
    $scope.email = "";
    $scope.domain = "@nottingham.co.uk";

    $scope.focusOnEmail = function() {
      $('#emailField').focus();
    }

    $scope.moveToEmailField = function () {
      if ($scope.email == "") {
        $scope.focusOnEmail();
      }
    }

  	$scope.signUp = function() {
      if ($scope.email != "" && $scope.password != "" && $scope.confirmPassword != "") {
        if ($scope.password != $scope.confirmPassword) {
          alert("Passwords don't match :(")
        } else {
          var userDetails = {
            username: $scope.email,
            forename:'',
            surname:'',
            email: $scope.email + $scope.domain,
            password:$scope.password,
            phoneNumber:''
          }

          console.log(userDetails)
          $http({
            method: 'POST',
            data: JSON.stringify(userDetails),
            url: 'https://127.0.0.1:5000/api/register'
          }).then(function successCallback(response) {
              console.log("HTTPS: user created successfully");
              toggleEmailSentConfirmation();
              correctEmailSent = true;
          }, function errorCallback(response) {
              console.log("HTTPS: Error creating user")
              console.log(response)
                toggleEmailSentConfirmation();
          });  
        }
      } else if ($scope.email == "") {
        alert("Please enter your email")
      } else if ($scope.password == "") {
        alert("Please enter a password")
      } else if ($scope.confirmPassword == "") {
        alert("Please confirm your password")
    	} else {
        alert("Dunno")
      }
    }

    $scope.reEnterEmail = function () {
      toggleEmailSentConfirmation();
      $scope.email = "";
      $scope.focusOnEmail();
      correctEmailSent = false;
    }

    $scope.comparePasswords = function () {
        var confirmPassword = $('#confirmPassword');
        if (confirmPassword.hasClass('md-input-invalid')) {
            if ($scope.password == $scope.passwordConfirm) {
                confirmPassword.removeClass('md-input-invalid');
            }
        } else {
            if ($scope.password !== $scope.passwordConfirm) {
                confirmPassword.addClass('md-input-invalid');
            }    
        }
    }


    var toggleEmailSentConfirmation = function () {
      $('#emailSent').toggleClass('showConfirmation');
      if (!correctEmailSent) {
        var translation = 'translateY(-' +  ($('#emailSent').position().top - $('#signupContainer').position().top - 20).toString() + 'px)';
        $('#emailSent').css('transform', translation);
      } else {
        $('#emailSent').css('transform', '')
      }
    }

    init();
  }]);