'use strict';

angular.module('unisalad')
  .controller('GeneralCtrl', ['$scope', '$http', function ($scope, $http) {
  	//in future load splash image instead of hiding everything
  	$('#splashScreen').fadeOut('3000', function () {
  		$('#rootRoot').css("visibility", "visible");
  	});

  	var test = function () {
      $http({
          method: 'GET',
          url: '/api/protected'
        }).then(function successCallback(response) {
          console.log("user is logged in! ")
            console.log(response)
        }, function errorCallback(response) {
            alert("HTTP: Error creating user")
            if (response.data) {console.log(response.data.errorMessage)}
            else {console.log(response)}
        }); 
    }

    test()
  	  
  }]);
