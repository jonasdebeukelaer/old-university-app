angular.module('unisalad')
  .directive('postSale', function () {
    return {
      templateUrl: 'js/directives/postsale.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });