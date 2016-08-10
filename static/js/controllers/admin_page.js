'use strict';

angular.module('unisalad')
  .controller('AdminPageCtrl', function ($scope) {
  	$scope.pageClass = "admin-page";
  	$scope.admins = [{
      name: 'reb'
    }, 
    {
      name: 'Jonas'
    }]

    $scope.mods = [{
      name: 'Molly'
    }, 
    {
      name: 'a mod'
    }]

    $scope.users = [{
      name: 'basic user 1'
    },
    {
      name: 'basic user 2'
    },
    {
      name: 'basic user 3'
    },
    {
      name: 'basic user 4'
    },
    {
      name: 'basic user 5'
    }]
  });
