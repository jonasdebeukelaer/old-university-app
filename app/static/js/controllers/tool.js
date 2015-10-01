'use strict';

angular.module('unisalad')
  .controller('ToolCtrl', ['$scope', '$location', 'localStorageService', 'currentList', '$mdSidenav', function ($scope, $location, localStorageService, currentList, $mdSidenav) {
    $scope.university = localStorageService.get('uni');

    $scope.items = [{
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
        label: 'anons',
    	name: 'Anonymous',
    	posts: '100',
        icon: 'misc'
    },
    {
        label: 'sales',
    	name: 'For sale',
    	posts: '20',
        icon: 'sell'
    }
    ];

    currentList.list = $scope.items[0];

    $scope.goToList = function (list) {
      console.log(list.label);
      $location.path(list.label);
      currentList.list = list;
      $mdSidenav('left').close();
    };
  }]);
