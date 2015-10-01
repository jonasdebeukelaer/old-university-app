'use strict';

angular.module('unisalad')
  .controller('CardCtrl', ['$scope', 'currentList', function ($scope, currentList) {
  	$scope.show = false;
    $scope.arrow = 'arrow_down';

    $scope.list = function () {
      return currentList.list;
    }

  	$scope.showDetails = function () {
  		return $scope.show;
  	}

  	$scope.toggleDetails = function () {
  		if ($scope.show === false) {
  			$scope.show = true;
        $scope.arrow = 'arrow_up';        
  		} else {
  			$scope.show = false;
        $scope.arrow = 'arrow_down';
  		};
  	};
  }]);
