angular.module('unisalad')
.controller('RightCtrl', ['$scope', '$timeout', '$location', 'sidenavs', 'userData', function ($scope, $timeout, $location, sidenavs, userData) {

    $scope.forename = userData.forename
    $scope.uni = userData.university
    $scope.userPosts = userData.posts

    $scope.toggleSidebar = function(side) {
      sidenavs.toggleSidebar(side);
    };
    
    $scope.closeRight = function () {
      $scope.toggleSidebar('right');
    };

    $scope.editPost = function(postId) {
      $scope.toggleSidebar('right');
      $location.path('app/addpost');
    }

    $scope.openProfile = function () {
      $scope.toggleSidebar('right');
      $location.path('app/profile');
    }
  }]);