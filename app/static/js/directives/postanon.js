'use strict';

angular.module('unisalad')
  .directive('postAnon', function () {
    return {
      templateUrl: 'js/directives/postanon.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });
