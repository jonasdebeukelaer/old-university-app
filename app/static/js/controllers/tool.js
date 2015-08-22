'use strict';

/**
 * @ngdoc function
 * @name yomantutApp.controller:ToolCtrl
 * @description
 * # ToolCtrl
 * Controller of the yomantutApp
 */
angular.module('unisalad')
  .controller('ToolCtrl', ['$scope', '$location', 'localStorageService', function ($scope, $location, localStorageService) {
    $scope.university = localStorageService.get('uni');

    $scope.items = [ {
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
        icon: 'homeBig'
    },
    {
        label: 'misc',
    	name: 'Miscellaneous',
    	posts: '100',
        icon: 'misc'
    },
    {
        label: 'sale',
    	name: 'For sale',
    	posts: '20',
        icon: 'sell'
    }
    ];

    $scope.goToList = function (list) {
        $location.path('/listview');
        localStorageService.set('list', list);
    };
  }]);
