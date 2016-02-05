'use strict';

angular.module('unisalad')
  .controller('CardCtrl', ['$scope', 'currentList', 'userData', function ($scope, currentList, userData) {
  	$scope.show = false;
    $scope.arrow = 'arrow_down';
    $scope.userOwned = false

    $scope.userPostIds = userData.postIds

    $scope.openMore = function ($mdOpenMenu, ev) {
      var thisCardId = $(ev.target).parents('.more-button')[0].id
      console.log(thisCardId)
      thisCardId = thisCardId.substring(4, thisCardId.length)
      console.log(thisCardId)
      console.log(userData.postIds)
      if (contains(userData.postIds, thisCardId)) {
        $scope.userOwned = true
      }
      console.log($scope.userOwned)
      $mdOpenMenu(ev)
    }

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

    var contains = function(list, needle) {
      for(var i = 0; i < list.length; i++) {
          if(list[i].toString() === needle) {
            return true
          }
      }
      return false
    }
  }]);

