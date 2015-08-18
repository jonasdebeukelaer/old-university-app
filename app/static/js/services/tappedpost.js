'use strict';

/**
 * @ngdoc service
 * @name yomantutApp.tappedPost
 * @description
 * # tappedPost
 * Service in the yomantutApp.
 */
angular.module('unisalad')
  .service('tappedPost', function () {
    this.post = {
    	id: 0,
    	item: '',
    	postDate: new Date("2015-01-01"),
    	user: '',
        number: 0,
    	cost: 0,
    	meet: '',
    	eventDate: new Date("2015-01-01")
    }
  });
