'use strict';

angular.module('unisalad')
  .controller('CardCtrl', ['$scope', '$location', '$mdDialog', 'currentList', 'userData', 'toast', function ($scope, $location, $mdDialog, currentList, userData, toast) {
  	$scope.show = false;
    $scope.arrow = 'arrow_down';
    $scope.userOwned = false

    $scope.userPostIds = userData.postIds

    var postId = null

    $scope.openMore = function ($mdOpenMenu, ev) {
      var thisCardId = $(ev.target).parents('.more-button')[0].id
      thisCardId = thisCardId.substring(4, thisCardId.length)
      postId = thisCardId
      if (contains(userData.postIds, thisCardId)) {
        $scope.userOwned = true
      }
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

    $scope.viewUser = function (ev) {
      $location.path('app/profile');
    }

    $scope.reportUser = function (ev) {
      var confirm = $mdDialog.confirm()
          .title('Confirm')
          .textContent('Report this person?')
          .ariaLabel('sure?')
          .targetEvent(ev)
          .ok('Confirm')
          .cancel('Cancel')
      $mdDialog.show(confirm).then(function() {
        console.log('report the post!')
        toast.displayToast('Post reported')
      }, function() {
        console.log('cancel report')
      });
    }


    var contains = function(list, needle) {
      for(var i = 0; i < list.length; i++) {
          if(list[i].toString() === needle) {
            return true
          }
      }
      return false
    }
  }]);

