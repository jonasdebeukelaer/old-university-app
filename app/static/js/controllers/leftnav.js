'use strict';

angular.module('unisalad')
	.controller('LeftCtrl', ['$scope', '$location', 'currentList', 'sidenavs', function ($scope, $location, currentList, sidenavs) {
    
    $scope.items = [{
      label: 'general',
      name: 'General',
      posts: '100',
      icon: 'misc'
    },
    {
      label: 'tickets',
    	name: 'Tickets',
    	posts: '10',
       icon: 'tickets'
    },
    {
      label: 'lifts',
    	name: 'Lifts',
    	posts: '21',
      icon: 'lifts'
    },
    {
      label: 'houses',
      name: 'Houses',
      posts: '-20',
      icon: 'bed'
    },
    {
      label: 'sales',
    	name: 'For sale',
    	posts: '20',
      icon: 'sell'
    }
    ];

    $scope.toggleSidebar = function(side) {
      sidenavs.toggleSidebar(side);
    };

    $scope.goToPage = function (option) {
      var page = option.label;

      var lists = ['general', 'tickets', 'lifts', 'houses', 'sales'];
      
      if ($.inArray(page, lists)) {
        currentList.list = option;
      }
      $location.path('app/' + page)
      $scope.toggleSidebar('left');
    }
  }])
