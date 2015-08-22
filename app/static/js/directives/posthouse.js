angular.module('unisalad')
  .directive('postHouse', function () {
    return {
      templateUrl: 'js/directives/posthouse.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });