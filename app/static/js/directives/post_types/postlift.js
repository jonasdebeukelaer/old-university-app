'use strict';

angular.module('unisalad')
  .directive('postLift', function () {
    return {
      templateUrl: 'js/directives/post_types/postlift.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });
