'use strict';

angular.module('unisalad')
  .service('currentList', function () {
    this.list = {
        label: 'ticket',
        name: 'Tickets',
        posts: 0,
        icon: 'tickets'
    };
  });