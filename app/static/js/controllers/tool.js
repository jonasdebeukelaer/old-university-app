'use strict';

angular.module('unisalad')
  .controller('ToolCtrl', ['$scope', '$location', 'localStorageService', 'currentList', function ($scope, $location, localStorageService, currentList) {
    $scope.university = localStorageService.get('uni');

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
      $('#' + side + '-sidebar').toggleClass(side + '-sidebar-open');
      $('body').toggleClass('sidebar-open');
      $('.swipe-area-' + side).toggleClass(side + '-sidebar-open');
    };

    $scope.goToPage = function (option) {
      var page = option.label;

      var lists = ['general', 'tickets', 'lifts', 'houses', 'sales'];
      
      if ($.inArray(page, lists)) {
        console.log(option)
        currentList.list = option;
      }
      $location.path('app/' + page)
      $scope.toggleSidebar('left');
    };
  }]);
