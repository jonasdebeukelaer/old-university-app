'use strict';

angular.module('unisalad')
  .directive('moreButton', function () {
    return {
      templateUrl: 'js/directives/card-more-button.html',
      restrict: 'E',
      scope: {
      	nfo: '='
      }
    };
  })