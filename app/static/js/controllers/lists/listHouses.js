'use strict';

angular.module('unisalad')
  .controller('ListHousesCtrl', ['$q', '$scope', 'searchText', 'filterFilter', 'currentList', 'fetchPosts', '$location', 'listFunctions', 
                                function ($q, $scope, searchText, filterFilter, currentList, fetchPosts, $location, listFunctions) {
    $scope.pageClass = 'page-houses';
    $scope.list = {
      label: 'houses',
      name: 'Houses',
      posts: '10',
      icon: 'home'
    }
    listFunctions.setList($scope.list);

    $scope.searchText = searchText;
    $scope.sortModes = [{
        label: 'Date added',
        code: 'postDate',
    },
    { 
        label:'Price',
        code: 'cost'
    },
    {
        label: 'Date of event',
        code: 'eventDate'
    }];
    $scope.sortBy = 'postDate';

    function getLists () {
      listFunctions.loadPosts('houses', function(data) {
        $scope.posts = data;
      });
    }

    getLists();

    $scope.hideAddpostButton = function () {
      listFunctions.hideAddpostButton;
    }

    ;( function( $ ) { $( '.swipebox' ).swipebox(); } )( jQuery );

    $scope.openPostDetails = function ($event, clickedPost) {
      listFunctions.postTapped($event, clickedPost);
    }
  }]);