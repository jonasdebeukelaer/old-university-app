'use strict';

angular.module('unisalad')
  .controller('ContactSheetCtrl', ['$scope', '$location', 'tappedPost', '$mdBottomSheet', '$timeout', function ($scope, $location, tappedPost, $mdBottomSheet, $timeout) {
    $scope.post = tappedPost.post;
    $scope.page = $location.path().split("/").pop();

    var users = [{
      id: 1,
      name: 'Helen Mart',
      number: 07412659637,
      email: 'helen.mart@email.com'
    },
    {
      id: 2,
      name: 'James Smith',
      number: 07312659637,
      email: 'james.smith@gmail.com'
    }]

    var userId = $scope.post.id - 1;

    if (typeof users[userId] != 'undefined') {
	    $scope.contactNumber = users[userId]['number'];
	    $scope.contactEmail = users[userId]['email'];
  	};


    var postTitle = $scope.post.item;
    $scope.smsTemplate = encodeURIComponent('Re: ' + postTitle + '\n\nsomething something');
    $scope.emailSubject = encodeURIComponent('UniSalad - Re: ' + postTitle);
    $scope.emailBody = encodeURIComponent('Helloooo,\n\nsomething something');


    $scope.keepPost = function (postId) {
      //re add post to listing
      removePostFromView(postId);
      clickNextPost(postId);
    }

    $scope.removePost = function (postId) {
      //remove post and give user warning
      removePostFromView(postId);
      clickNextPost(postId);
    }

    $scope.unsure = function (postId) {
      clickNextPost(postId);
    }

    function removePostFromView(postId) {
      $('#id' + postId).remove();
      $mdBottomSheet.hide();
    }

    function clickNextPost(postId) {
      if ($('#id' + postId).is(':last-child') == false) {
        $timeout(function(){
          $('#id' + postId).next().triggerHandler('click');
        },0);
        
      }
    }

  }]);