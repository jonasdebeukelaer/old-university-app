angular.module('unisalad')
  .directive('postGen', function () {
    return {
      templateUrl: 'js/directives/postgen.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });