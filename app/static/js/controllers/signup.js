'use strict';

angular.module('unisalad')
  .controller('SignupCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  	var userId = null

  	var checkConfirmationCode = function () {
  		var urlParts = window.location.href.split("?")
  		if (urlParts.length == 2) {
  			var verifyInfo = urlParts[1].split("=")
  			if (verifyInfo.length == 2) {
  				userId = verifyInfo[0]
  				var userCode = verifyInfo[1] 
  				console.log("user: " + userId)
	  			console.log("userCode: " + userCode)
	  			var verifyUrl = ('/api/user/' + userId + '/verify/' + userCode).toString()
	  			console.log(verifyUrl)
	  			$http({
		          method: 'GET',
		          url: verifyUrl
		        }).then(function successCallback(response) {
              console.log(response)
		            $scope.email = response.data.email
		        }, function errorCallback(response) {
		            console.log("Error occured signing up:");
		            if (response.data) {console.log(response.data.errorMessage)}
                else {console.log(response)}
		        });	
  			} else {
  				console.log("Missing url parameter: " + verifyInfo)
  			}
  		} else {
  			console.log("Missing url parameter: " + urlParts)
  		}
  	}

  	$scope.email = "blah@email.com"

  	$scope.signup = {
        forename:"",
        surname:"",
        password:"",
        number:""
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

    $scope.finishSignup = function () {
    	//validate signup var ?
    	$http({
          method: 'POST',
          data: JSON.stringify($scope.signup),
          url: '/api/user/' + userId + '/completeSignup'
        }).then(function successCallback(response) {
            $location.path('app/general');
        }, function errorCallback(response) {
            console.log("Error occured signing up:");
            if (response.data) {console.log(response.data.errorMessage)}
            else {console.log(response)}
        });
    }

    checkConfirmationCode();
  }]);