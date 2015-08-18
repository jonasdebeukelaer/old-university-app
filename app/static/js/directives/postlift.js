'use strict';

/**
 * @ngdoc directive
 * @name yomantutApp.directive:postLift
 * @description
 * # postLift
 */
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
