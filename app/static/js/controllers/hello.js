'use strict';

angular.module('unisalad')
  .controller('HelloCtrl', ['$scope', 'localStorageService', function ($scope, localStorageService) {
  	var viewHeight = $(window).height();
  	$('.welcome-1').css('height', viewHeight);
  	$('.welcome-2').css('height', viewHeight);
  	$('.btn-join').css('margin-top', viewHeight - 400)
  	$('welcome-2 a').css('top', viewHeight-50)
  	$scope.goToSignin = function () {
  		localStorageService.set('sign', 'in')
  	}
  }]);
