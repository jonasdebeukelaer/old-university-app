'use strict';

angular.module('unisalad')
  .controller('ProfileCtrl', ['$scope', 'listFunctions', function ($scope, listFunctions) {
  	$scope.pageClass = 'page-profile';

  	$scope.user = {
  		name:"Barry Scott",
  		uni:"Nottingham University",
  		avatarUrl:"http://www.placecage.com/200/200",
  		bio: "I like turtles",
  		ratings: {
  			gen: 25,
  			seller: 4,
  			buyer: 3
  		},
  		postsIds: [3, 32, 41]
  	}

  	$scope.posts = [
  	{
  		type: "ticket",
  		title: "test in profile"
  	}]

  }]);
