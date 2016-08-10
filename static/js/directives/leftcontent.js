'use strict';

angular.module('unisalad')
  .directive('leftContent', function () {
    return {
      templateUrl: 'js/directives/leftcontent.html',
      restrict: 'E',
      scope: {
      	nfo: '='
      }
    };
  })