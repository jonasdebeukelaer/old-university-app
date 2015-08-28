'use strict';

/**
 * @ngdoc function
 * @name yomantutApp.controller:ListviewCtrl
 * @description
 * # ListviewCtrl
 * Controller of the yomantutApp
 */
angular.module('unisalad')
  .controller('ListviewCtrl', ['$scope', 'searchText', 'filterFilter', 'localStorageService', '$animate', '$mdBottomSheet', 'tappedPost', '$mdMedia',
                                function ($scope, searchText, filterFilter, localStorageService, $animate, $mdBottomSheet, tappedPost, $mdMedia) {


    $scope.list = localStorageService.get('list');

    $scope.searchText = searchText;


    $scope.posts = [{
        id: 1,
    	item: 'Crisis ticket',
    	postDate: new Date("2015-03-20"),
    	user: 'Helen Mart',
        number: 1,
    	cost: 20,
    	meet: 'Lenton pick up',
    	eventDate: new Date("2015-03-25"),
      extraInfo: 'Extra info about the ticket goes here'
    },
    {
      id: 2,
      item: 'Crisis ticket',
      postDate: new Date("2015-03-14"),
      user: 'James Smith',
      number: 2,
      cost: 18.5,
      meet: 'your house',
      eventDate: new Date("2015-03-25"),
      extraInfo: 'Extra info about the ticket goes here'
    },
    {
      id: 3,
      item: 'Crisis ticket',
      postDate: new Date("2015-03-21"),
      user: 'James Bore',
      number: 2,
      cost: 22,
      meet: 'the moon',
      eventDate: new Date("2015-03-26"),
      extraInfo: 'Extra info about the ticket goes here'
    },
    {
      id: 4,
    	item: 'crisis ticket',
    	postDate: new Date("2015-02-22"),
    	user: 'Bob todd',
      number: 1,
    	cost: 12,
    	meet: 'Lenton pick up',
    	eventDate: new Date("2015-03-19"),
      extraInfo: 'Extra info about the ticket goes here'
    },
    {
      id: 5,
      item: 'Ocean',
      postDate: new Date("2014-02-25"),
      user: 'Rad Cliff',
      number: 3,
      cost: 5,
      meet: 'library',
      eventDate: new Date("2015-12-19"),
      extraInfo: 'Extra info about the ticket goes here'
    },
    {
      id: 6,
      item: 'Boiler Room',
      postDate: new Date("2014-02-25"),
      user: 'Hudmo lol',
      number: 1,
      cost: 10,
      meet: 'SN8 massive',
      eventDate: new Date("2015-10-19"),
      extraInfo: 'Extra info about the ticket goes here'
    }];


    $scope.lifts = [{
      id: 1,
      to: 'nottingham',
      from: 'Shoredich, London',
      postDate: new Date("2014-02-25"),
      user: 'MC Solaar',
      spaces: 2,
      leavingDate: new Date("2015-10-19"),
      flexibility: 3,
      cost: 10,
      extraInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
      id: 2,
      to: 'Gloucester, Gloucestershire',
      from: 'Lenton',
      postDate: new Date("2015-05-25"),
      user: 'MC Solaar',
      spaces: 1,
      leavingDate: new Date("2015-08-30"),
      flexibility: 0,
      cost: 5,
      extraInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis '
    }];


    $scope.houses = [{
      id: 1,
      isOffering: true,
      title: 'double room for rent',
      postDate: new Date("2015-05-25"),
      user: 'Manny Zarate',
      cost: '1000',
      location: '26 Hetley Road, London, Banterville',
      moveDate: new Date("2015-08-31"),
      pics: [{
        caption: 'dis de bed',
        img: 'images/Aug15/bed.jpg'
      },
      {
        caption: 'the front',
        img: 'images/Aug15/front.jpg'
      }],
      link: 'http://www.spareroom.co.uk/',
      extraInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi'
    }]

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

        var clickedElementClass = $event.target.className;

        if (clickedElementClass === 'post-img') {
          console.log('clicked pic');

        } else if (clickedElementClass === 'post-link') {
          console.log('clicked link');

        } else {
          tappedPost.post = clickedPost;

          ScrollOperation(clickedPost, $root, offset, wideScreen);
          
          $mdBottomSheet.show({
              templateUrl: 'views/postdetails.html',
              controller: 'PostdetailCtrl',
              targetEvent: $event
          }).then(function () {
              console.log('clicked a contact method');
          }, function () {
              console.log('cancelled bottom-sheet');

              var focusedId = "#idCard" + clickedPost.id;
              $(focusedId).removeClass('bottom-sheet-open'); 
              $('#listview').removeClass('bottom-sheet-open'); //add padding to bottom so lowest posts can still be brought up
          });
        };

    };


  }]);


function ScrollOperation(clickedPost, $root, offset, wideScreen) {
    var idFormatted = '#idCard' + clickedPost.id;
    $(idFormatted).addClass('bottom-sheet-open');

    $('#listview').addClass('bottom-sheet-open');

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
      console.log('finished scroll')
    });

  }
