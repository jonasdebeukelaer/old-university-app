'use strict';

angular.module('unisalad')
  .directive('postLift', function () {
    return {
      templateUrl: 'js/directives/postlift.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });
