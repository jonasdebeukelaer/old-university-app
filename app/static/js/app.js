// Declare app level module which depends on filters, and services
angular.module('unisalad', [
	'ngResource',
	'ngRoute',
	'ui.bootstrap',
	'ui.date',
  'ngTouch',
  'LocalStorageModule',
  'ngAnimate',
  'ngMaterial'
	])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html', 
        controller: 'HomeController'})
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/tool', {
        templateUrl: 'views/tool.html',
        controller: 'ToolCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/listview', {
        templateUrl: 'views/listview.html',
        controller: 'ListviewCtrl'
      })
      .when('/addpost', {
        templateUrl: 'views/addpost.html',
        controller: 'AddpostCtrl'
      })
      .when('/confirmationsent', {
        templateUrl: 'views/confirmationsent.html',
        controller: 'ConfirmationsentCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
