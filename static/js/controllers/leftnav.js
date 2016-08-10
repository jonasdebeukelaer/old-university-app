'use strict';

angular.module('unisalad')
	.controller('LeftCtrl', ['$scope', '$location', 'currentList', 'sidenavs', function ($scope, $location, currentList, sidenavs) {
    
    $scope.items = [
    {
      label: 'tickets',
    	name: 'Tickets',
    	posts: '10',
       icon: 'tickets'
    }
    ];

    $scope.toggleSidebar = function(side) {
      sidenavs.toggleSidebar(side);
    };

    $scope.goToPage = function (option) {
      var page = option.label;

      var lists = ['tickets'];
      
      if ($.inArray(page, lists)) {
        currentList.list = option;
      }
      $location.path('app/' + page)
      $scope.toggleSidebar('left');
    }
  }])
