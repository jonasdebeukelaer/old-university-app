'use strict';

angular.module('unisalad')
  .service('fetchPosts', ['$http', function ($http) {
  	this.getPosts = function() {

      var postPromise = new Promise(function(resolve, reject) {
        $http({
            method: 'GET',
            url: 'https://127.0.0.1:5000/api/posts/user/12' //TODO return all user posts
          }).then(function successCallback(response) {
              console.log("HTTPS: got posts successfully");
              console.log(response)
              resolve(reponse.data);
          }, function errorCallback(response) {
              reject(Error("HTTPS: Error getting posts"));
          }); 

      })
  		
  	}

  	this.getFlaggedPosts = function() {
  		return $http.get('data/datalist_flagged.json')
  	}
  }]);