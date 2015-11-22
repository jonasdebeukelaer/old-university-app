angular.module('unisalad')
  .directive('postGen', function () {
    return {
      templateUrl: 'js/directives/post_types/postgen.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });