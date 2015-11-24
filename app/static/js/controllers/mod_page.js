'use strict';

angular.module('unisalad')
  .controller('ModPageCtrl', function ($scope) {
  	$scope.pageClass = "mod-page";
  	$scope.examplePost = {
      "type":"ticket",
  		"id": 1,
    	"item": "Crisis ticket",
    	"postDate": "2015-03-20",
    	"user": "Helen Mart",
      "number": 1,
    	"cost": 20,
    	"meet": "Lenn pick up",
    	"evenDate": "2015-03-25",
      "extraInfo": "Extra info about the ticket goes here"
  	}

    $scope.list = function () {
      return "ticket"
    }
  });
