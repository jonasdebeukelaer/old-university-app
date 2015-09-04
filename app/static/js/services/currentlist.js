'use strict';

angular.module('unisalad')
  .service('currentList', function () {
    this.list = {
        label: 'tickets',
        name: 'Tickets',
        posts: 0,
        icon: 'tickets'
    };
  });