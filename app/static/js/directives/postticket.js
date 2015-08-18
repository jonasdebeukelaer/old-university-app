'use strict';

/**
 * @ngdoc directive
 * @name yomantutApp.directive:post
 * @description
 * # post
 */
angular.module('unisalad')
  .directive('postTicket', function () {
    return {
      templateUrl: 'js/directives/postticket.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });
