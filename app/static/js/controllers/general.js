'use strict';

angular.module('unisalad')
  .controller('GeneralCtrl', ['$scope', '$mdMedia',function ($scope, $mdMedia) {
  	//in future load splash image instead of hiding everything
    document.getElementsByTagName("html")[0].style.visibility = "visible";

  }]);
