angular.module('unisalad')
  .directive('postSale', function () {
    return {
      templateUrl: 'js/directives/post_types/postsale.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });