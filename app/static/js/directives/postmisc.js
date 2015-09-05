'use strict';

angular.module('unisalad')
  .directive('postMisc', function () {
    return {
      templateUrl: 'js/directives/postmisc.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });
