'use strict';

/**
 * @ngdoc function
 * @name yomantutApp.controller:ConfirmationsentCtrl
 * @description
 * # ConfirmationsentCtrl
 * Controller of the yomantutApp
 */
angular.module('unisalad')
  .controller('ConfirmationSentCtrl', function ($scope) {
  	$scope.pageClass = 'page-emailsent';

  	var viewHeight = $(window).height();
    var cardHeight = $('.container-card').height()
    $('.container-card').css('margin-top', Math.floor(0.5*(viewHeight-cardHeight-320)))

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
