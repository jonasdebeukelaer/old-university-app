'use strict';

angular.module('unisalad')
  .service('listFunctions', ['tappedPost', '$mdMedia', '$timeout', '$mdBottomSheet', 'fetchPosts', 'currentList', function (tappedPost, $mdMedia, $timeout, $mdBottomSheet, fetchPosts, currentList) {

  	this.hideAddpostButton = $('#addpost').addClass('add-post-hide');
  	this.setList = function (list) {
  		currentList.list = {
  			label: list.label,
  			name: list.name,
  			icon: list.icon
  		}
  	}

  	this.loadPosts = function (list, callback) {
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
        callback(JSONfile[list]);
      })
  	}



  	this.postTapped = function($event, clickedPost, $root) {
  		var offset = 70;
	    var wideScreen = $mdMedia('gt-md');
	    
	    if (wideScreen) {
	      var $root = $('.page');
	    } else {
	      var $root = $('body, html');
	    };

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

      } else if (clickedElementId === 'contractUp' || clickedElementId === 'extraInfo') {
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
  }]);

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