'use strict';

angular.module('unisalad')
  .directive('rightContent', function () {
    return {
      templateUrl: 'js/directives/rightcontent.html',
      restrict: 'E',
      scope: {
      	nfo: '='
      }
    };
  });
