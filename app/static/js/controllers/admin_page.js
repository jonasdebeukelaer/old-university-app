'use strict';

angular.module('unisalad')
  .controller('AdminPageCtrl', function ($scope) {
  	$scope.pageClass = "admin-page";
  	$scope.examplePost = {
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
  });
