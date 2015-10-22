'use strict';

/**
 * @ngdoc function
 * @name yomantutApp.controller:ConfirmationsentCtrl
 * @description
 * # ConfirmationsentCtrl
 * Controller of the yomantutApp
 */
angular.module('unisalad')
  .controller('ConfirmationsentCtrl', function ($scope) {
  	$scope.pageClass = 'page-emailsent';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
