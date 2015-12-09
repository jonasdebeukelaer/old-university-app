angular.module('unisalad')
.controller('RightCtrl', ['$scope', '$timeout', '$log', '$location', function ($scope, $location) {
    $scope.toggleSidebar = function(side) {
      $('#' + side + '-sidebar').toggleClass(side + '-sidebar-open');
      $('body').toggleClass('sidebar-open');
    };
    $scope.closeRight = function () {
      $scope.toggleSidebar('right');
    };

    $scope.editPost = function(postId) {
      $scope.toggleSidebar('right');
      $location.path('/addpost');
    }
  }]);