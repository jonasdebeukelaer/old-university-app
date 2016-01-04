angular.module('unisalad')
.controller('RightCtrl', ['$scope', '$timeout', '$location', 'sidenavs', function ($scope, $timeout, $location, sidenavs) {
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
  }]);