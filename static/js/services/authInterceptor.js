'use strict';

angular.module('unisalad')
	.config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    }])

    .factory('authInterceptor', ['$localStorage',
      function ($localStorage) {
        return {
          request: function (config) {
            config.headers = config.headers || {};
            if (!config.headers.NotNeedAuthorization)
              config.headers.Authorization = $localStorage.token;
            return config;
          }
        };
      }]);;