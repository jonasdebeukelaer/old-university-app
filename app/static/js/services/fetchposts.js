'use strict';

angular.module('unisalad')
  .service('fetchPosts', ['$http', function ($http) {
  	this.getPosts = function() {
  		return $http.get('data/datalist.json')
  	}

  	this.getFlaggedPosts = function() {
  		return $http.get('data/datalist_flagged.json')
  	}
  }]);