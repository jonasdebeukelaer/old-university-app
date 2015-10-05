'use strict';

angular.module('unisalad')
  .controller('ListviewCtrl', ['$q', '$scope', '$http', 'searchText', 'filterFilter', '$animate', '$mdBottomSheet', 'tappedPost', '$mdMedia', 'currentList', 'fetchPosts', '$location', '$timeout', 
                                function ($q, $scope, $http, searchText, filterFilter, $animate, $mdBottomSheet, tappedPost, $mdMedia, currentList, fetchPosts, $location, $timeout) {

    $scope.pageClass = 'page-listview';
    
    $scope.list = currentList.list;

    $scope.searchText = searchText;

    function getLists () {
      var thing = fetchPosts.getPosts();
      thing.then(function(JSONfile) {
        return JSONfile.data;
      }).then(function(JSONfile) {
        var oneDetail = '';
        var onePost = {};
        for (var postType in JSONfile) {
          for (var i=0; i < JSONfile[postType].length; i++) {
            onePost = JSONfile[postType][i];
            for (var oneDetail in onePost) {
              if (oneDetail.indexOf('Date') != -1) {
                var dateType = JSONfile[postType][i][oneDetail]
                JSONfile[postType][i][oneDetail] = new Date(dateType)
              }
            }
          }
        }
        $scope.tickets = JSONfile.tickets;
        $scope.lifts = JSONfile.lifts;
        $scope.houses = JSONfile.houses;
        $scope.anons = JSONfile.anons;
        $scope.sales = JSONfile.sales;
      })
    }

    getLists();
    

    $scope.sortModes = [{
        label: 'Date added',
        code: 'postDate'
    },
    { 
        label:'Price',
        code: 'cost'
    }];

    if ($scope.list.label == 'tickets') { 
      $scope.sortModes[2] = {
        label: 'Date of event',
        code: 'eventDate'
      }
    } else if ($scope.list.label == 'lifts') {
      $scope.sortModes[2] = {
        label: 'Leaving date',
        code: 'leavingDate'
      }
    };

    $scope.sortBy = 'postDate';

    $scope.goToAddpost = function () {
      $('#addpost').addClass('add-post-hide');
      $location.path('/addpost');
    }

    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------

    ;( function( $ ) {

    $( '.swipebox' ).swipebox();

    } )( jQuery );

    var wideScreen = $mdMedia('gt-md');

    var offset = 70;
    if (wideScreen) {
      var $root = $('.page');
    } else {
      var $root = $('body, html');
    };

    $scope.openPostDetails = function($event, clickedPost) {
      if (currentList.listLabel != 'misc') {
        var clickedElementClass = $event.target.className;
        var clickedElementId = $event.target.id;

        if (clickedElementClass === 'post-img') {
          console.log('clicked pic');

        } else if (clickedElementClass === 'post-link') {
          console.log('clicked link');

        } else if (clickedElementClass === 'show-details') {
          console.log('clicked details');

        } else if (clickedElementId === 'expandDetails') {
          console.log('expand details');

        } else if (clickedElementId === 'expandDown') {
          console.log('expand down');

        } else if (clickedElementId === 'contractUp') {
          console.log('contract up');


        } else {
          tappedPost.post = clickedPost;

          ScrollOperation(clickedPost, $root, offset, wideScreen);
          
          $timeout(function () {
          $mdBottomSheet.show({
              templateUrl: 'views/contactsheet.html',
              controller: 'ContactSheetCtrl',
              targetEvent: $event
          }).then(function () {
              console.log('clicked a contact method');
          }, function () {
              console.log('cancelled bottom-sheet');

              var focusedId = "#idCard" + clickedPost.id;
              $(focusedId).removeClass('bottom-sheet-open'); 
              $('#listview').removeClass('bottom-sheet-open'); //add padding to bottom so lowest posts can still be brought up
          });
        }, 300);
        };
      };
    };

    $scope.addPost = function ($event) {
      $mdBottomSheet.show({
              templateUrl: 'views/addpostbs.html',
              controller: 'AddpostCtrl',
              targetEvent: $event
          }).then(function () {
              console.log('Added a post');
          }, function () {
              console.log('cancelled addpost bottom-sheet');
          });
    }


  }]); //MAKE SCROLL AND SHADOW CHANGE NOT HAPPEN SIMULTANEOUSLY


function ScrollOperation(clickedPost, $root, offset, wideScreen) {
    if (wideScreen) {
      var post = $('#id' + clickedPost.id).offset().top;
      var page = $('.page').scrollTop();

      var position = post + page - offset -70;
    } else {
      var position = $('#id' + clickedPost.id).offset().top - offset;
    };

    $root.animate({
        scrollTop: position
    }, 300, function () {
      console.log('finished scroll');
      var idFormatted = '#idCard' + clickedPost.id;
      $(idFormatted).addClass('bottom-sheet-open');
      $('#listview').addClass('bottom-sheet-open');
    });

  }
