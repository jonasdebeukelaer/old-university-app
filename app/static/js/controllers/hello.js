'use strict';

angular.module('unisalad')
  .controller('HelloCtrl', function () {
  	var viewHeight = $(window).height();
  	$('.welcome-1').css('height', viewHeight);
  	$('.welcome-2').css('height', viewHeight);
  	$('.btn-join').css('margin-top', viewHeight - 400)
  	$('welcome-2 a').css('top', viewHeight-50)
  });
