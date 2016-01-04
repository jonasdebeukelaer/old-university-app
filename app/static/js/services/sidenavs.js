'use strict';

angular.module('unisalad')
  .service('sidenavs', function () {
  	this.toggleSidebar = function(side) {
      $('#' + side + '-sidebar').toggleClass(side + '-sidebar-open');
      $('body').toggleClass('sidebar-open');
      $('.swipe-area-' + side).toggleClass(side + '-sidebar-open');
    };
  });