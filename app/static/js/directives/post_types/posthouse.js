angular.module('unisalad')
  .directive('postHouse', function () {
    return {
      templateUrl: 'js/directives/post_types/posthouse.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });