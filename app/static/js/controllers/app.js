'use strict';

angular.module('unisalad')
  .controller('AppCtrl', ['$scope', '$mdSidenav', '$mdMedia', '$location', 'localStorageService', '$mdToast', 
                    function ($scope, $mdSidenav, $mdMedia, $location, localStorageService, $mdToast) {

    //in future load splash image instead of hiding everything
    document.getElementsByTagName("html")[0].style.visibility = "visible";

    var headroom = new Headroom(document.getElementById("toolbar"), {
      "offset": 10,
      "tolerance": 10,
      "classes": {
        "initial": "animated",
        "pinned": "slideDown",
        "unpinned": "slideUp"
      }
    });
    headroom.init();

    var viewHeight = $(window).height();
    $('md-sidenav').css('bottom', 'auto');
    $('md-sidenav').css('height', viewHeight);
    $('div.page').css('min-height', viewHeight - 64);
    $('div.content').css('min-height', viewHeight - 64);

    $scope.toastAdded = function () {
      $mdToast.show(
      $mdToast.simple()
        .content('Post added!')
        .position('bottom')
        .hideDelay(1200)
      ); 
    }

    $scope.loggedIn = true;

    $scope.debugLoggedIn = function () {
      localStorageService.set('loggedIn', $scope.loggedIn);
    }

    $scope.goTo = function (view) {
      if(view == '/login') {
        localStorageService.set('sign', 'in');
      };
      $location.path(view);
    }

    $scope.wideScreen = $mdMedia('gt-md');

    $scope.toggleSidebar = function(side) {
      toggleSide(side)
    };

    $('.swipe-area-left').swipe({ swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
            if (phase=='move' && direction =='right') {
                 toggleSide('left');
                 return false;
            }
            if (phase=='move' && direction =='left') {
                 toggleSide('left');
                 return false;
            }
        }
    });

    $('.swipe-area-right').swipe({ swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
            if (phase=='move' && direction =='left') {
                 toggleSide('right');
                 return false;
            }
            if (phase=='move' && direction =='right') {
                 toggleSide('right');
                 return false;
            }
        }
    });

    var toggleSide = function (side) {
      $('#' + side + '-sidebar').toggleClass(side + '-sidebar-open');
      $('.swipe-area-' + side).toggleClass(side + '-sidebar-open');
      $('body').toggleClass('sidebar-open');
    }
    
  }])
  .controller('LeftCtrl', ['$scope', '$location', 'localStorageService', function ($scope, $location, localStorageService) {
    

    $scope.closeAndChangePage = function (view) {
      var loggedIn = localStorageService.get('loggedIn');

      if (view == '') {
        if (loggedIn) {
          $location.path('/tool');
        }else {
          $location.path('/');
        }
      } else {
        $location.path(view);
      };
      $scope.toggleSidebar('left');
    };
  }])
  .controller('RightCtrl', ['$scope', '$timeout', '$log', '$location', function ($scope, $location) {
    $scope.toggleSidebar = function(side) {
      $('#' + side + '-sidebar').toggleClass(side + '-sidebar-open');
      $('body').toggleClass('sidebar-open');
    };
    $scope.closeRight = function () {
      $scope.toggleSidebar('right');
    };

    $scope.editPost = function(postId) {
      $scope.toggleSidebar('right');
      $location.path('/addpost');
    }
  }]);
