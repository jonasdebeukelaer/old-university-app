'use strict';

angular.module('unisalad')
  .service('currentList', function () {
    this.list = {
        label: '',
        name: '',
        posts: 0,
        icon: ''
    };
  });