'use strict';

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
