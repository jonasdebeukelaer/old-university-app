'use strict';

angular.module('unisalad')
  .service('httpsRequests', ['$http', function ($http) {
  	var prefix = 'https://127.0.0.1:5000/api'

  	this.get = function(url) {
	    return $http({
	        method: 'GET',
	        url: prefix + url
	    }).then(function successCallback(response) {
	          console.log("HTTPS: successfull get");
	          console.log(response)
	          return response
	      }, function errorCallback(response) {
	      	console.log("HTTPS: failed get");
	          return response
	          console.log(response)
	      });
  	}
  }])