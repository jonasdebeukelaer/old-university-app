'use strict';

angular.module('unisalad')
  .controller('ModPageCtrl', ['$scope', 'listFunctions', function ($scope, listFunctions) {
    $scope.modPage = true
  	$scope.pageClass = "mod-page";

    listFunctions.loadPosts('flagged', function(data) {
        $scope.posts = data;
    });

    $scope.list = function () {
      return "ticket"
    }

    $scope.openPostDetails = function ($event, clickedPost) {
      listFunctions.postTapped($event, clickedPost);
    }
  }]);

  function removePost(card) {
    $(card).remove()
    //delete
  }

  function unflagPost(card) {
    $(card).remove()
    //unflag
  }
