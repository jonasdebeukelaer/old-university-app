'use strict';

angular.module('unisalad')
  .directive('post', function () {
    return {
      templateUrl: 'js/directives/post_base.html',
      restrict: 'E',
      scope: {
      	postInfo: '='
      }
    };
  });
