'use strict';

angular.module('unisalad')
  .directive('postTicket', function () {
    return {
      templateUrl: 'js/directives/post_types/postticket.html',
      restrict: 'E',
      scope: {
      	info: '='
      }
    };
  });
