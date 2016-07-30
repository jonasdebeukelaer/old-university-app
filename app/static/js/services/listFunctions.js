'use strict';

angular.module('unisalad')
  .service('listFunctions', ['tappedPost', '$location','$mdMedia', '$timeout', '$mdBottomSheet', 'httpsRequests', 'currentList', 
                    function (tappedPost, $location, $mdMedia, $timeout, $mdBottomSheet, httpsRequests, currentList) {
    var thisPage = $location.path().split("/").pop();

  	this.hideAddpostButton = $('#addpost').addClass('add-post-hide');
  	this.setList = function (list) {
  		currentList.list = {
  			label: list.label,
  			name: list.name,
  			icon: list.icon
  		}
  	}

  	this.loadPosts = function (list, callback) {

      var loadPromise = new Promise(function(resolve, reject) {
        var response = httpsRequests.get('/posts/user/12')

        if (response.status == "200") {
          console.log(response) 
          resolve(reponse.data);
        }
        else {
          reject(Error("It broke"));
        }
      });

      loadPromise.then(function(data) {
        console.log(data)
      }, function(err) {
        console.log(err)
      })

  		var thing = fetchPosts.getPosts(function (resp) {
        console.log(resp)
        var data = resp.data
        var oneDetail = '';
        var onePost = {};
        for (var postType in data) {
          for (var i=0; i < data[postType].length; i++) {
            onePost = data[postType][i];
            for (var oneDetail in onePost) {
              if (oneDetail.indexOf('Date') != -1) {
                var dateType = data[postType][i][oneDetail]
                data[postType][i][oneDetail] = new Date(dateType)
              }
            }
          }
        }
        console.log(list)
        if (list == 'flagged') {
          var allPosts = []
          for (var thisList in data) {
            for (var i = 0; i < data[thisList].length; i++) {
              allPosts.push(data[thisList][i])
            }
          }
          callback(allPosts)
        } else {
          callback(data[list]);
        }
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
      var clickedElementParentClass = $event.target.parentNode.className
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

      } else if (clickedElementClass.indexOf('md-icon-button more') > -1 || clickedElementParentClass.indexOf('md-icon-button more') > -1) {
        console.log('more');

      } else {
        tappedPost.post = clickedPost;

        ScrollOperation(clickedPost, $root, offset, wideScreen);
        
        $timeout(function () {
        $mdBottomSheet.show({
            templateUrl: 'js/directives/contactsheet.html',
            controller: 'ContactSheetCtrl',
            targetEvent: $event
        }).then(function () {
            console.log('clicked bottom sheet option');
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

function ClickNextPost(clickedPost) {
  console.log(clickedPost)
}