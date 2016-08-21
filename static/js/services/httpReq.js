'use strict';

angular.module('unisalad')
  .service('httpsRequests', ['$http', function ($http) {
  	var prefix = "/api";
  	if (window.location.href.contains("0.0.0.0")) { //debug for using grunt server
  		prefix = 'https://127.0.0.1:5000/api'	
  	}
  	

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

  	this.post = function(url, data) {
	    return $http({
	        method: 'POST',
	        data: data,
	        url: prefix + url
	    }).then(function successCallback(response) {
	          console.log("HTTPS: successfull post");
	          console.log(response)
	          return response
	      }, function errorCallback(response) {
	      	console.log("HTTPS: failed post");
	          return response
	          console.log(response)
	      });
  	}

  	this.put = function(url, data) {
	    return $http({
	        method: 'PUT',
	        data: data,
	        url: prefix + url
	    }).then(function successCallback(response) {
	          console.log("HTTPS: successfull put");
	          console.log(response)
	          return response
	      }, function errorCallback(response) {
	      	console.log("HTTPS: failed put");
	          return response
	          console.log(response)
	      });
  	}

  	this.delete = function(url) {
	    return $http({
	        method: 'DELETE',
	        url: prefix + url
	    }).then(function successCallback(response) {
	          console.log("HTTPS: successfull delete");
	          console.log(response)
	          return response
	      }, function errorCallback(response) {
	      	console.log("HTTPS: failed delete");
	          return response
	          console.log(response)
	      });
  	}
  }])