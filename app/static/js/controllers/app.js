'use strict';

/**
 * @ngdoc function
 * @name yomantutApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the yomantutApp
 */

angular.module('unisalad')
  .controller('AppCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$animate', '$mdMedia', '$location', 'localStorageService', 
                    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $animate, $mdMedia, $location, localStorageService) {

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
    $('div.page').css('min-height', viewHeight);
    $('div.content').css('min-height', viewHeight);



    $scope.onListview = false;
    
    $scope.$on('$routeChangeStart', function(event, next) {
      var path = next.$$route.originalPath;
      $log.debug('path is now ' + path);
      if (path === '/listview') {
         $scope.onListview = true;
       } else {
         $scope.onListview = false;
       }
       $scope.$evalAsync();
    });

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug('toggle ' + navID + ' is done');
          });
      },300);
      return debounceFn;
    }

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

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
    
  }])
  .controller('LeftCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$location', 'localStorageService', function ($scope, $timeout, $mdSidenav, $log, $location, localStorageService) {
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
      $mdSidenav('left').close();
    };
  }])
  .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$location', function ($scope, $timeout, $mdSidenav, $log, $location) {
    $scope.closeRight = function () {
      $mdSidenav('right').close();
    };

    $scope.editPost = function(postId) {
      $scope.closeRight();
      $location.path('/addpost');
      //populate addpost with post info
    }
  }]);
