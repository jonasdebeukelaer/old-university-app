'use strict';

angular.module('unisalad')
  .controller('ContactSheetCtrl', ['$scope', 'tappedPost', function ($scope, tappedPost) {
    $scope.post = tappedPost.post;

    var users = [{
      id: 1,
      name: 'Helen Mart',
      number: 07412659637,
      email: 'helen.mart@email.com'
    },
    {
      id: 2,
      name: 'James Smith',
      number: 07412659637,
      email: 'james.smith@gmail.com'
    }]

    var userId = $scope.post.id - 1;

    if (typeof users[userId] != 'undefined') {
	    $scope.contactNumber = users[userId]['number'];
	    $scope.contactEmail = users[userId]['email'];
  	};


    var postTitle = $scope.post.item;
    $scope.smsTemplate = encodeURIComponent('Re: ' + postTitle + '\n\nsomething something');
    $scope.emailSubject = encodeURIComponent('unisalad - Re: ' + postTitle);
    $scope.emailBody = encodeURIComponent('Helloooo,\n\nsomething something');

  }]);
