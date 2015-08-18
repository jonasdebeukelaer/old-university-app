// Declare app level module which depends on filters, and services
angular.module('unisalad', [
	'ngAnimate',
	'ngResource',
	'ngRoute',
  'ngTouch',
  'LocalStorageModule',
  'ngMaterial'
	])
	.config(['localStorageServiceProvider', function(localStorageServiceProvider){
	  localStorageServiceProvider.setPrefix('us');
	  }])
	.config(function($mdIconProvider) {
	    $mdIconProvider
	       .icon('add', 'images/icons/ic_add_24px.svg')
	       .icon('arrow_back', 'images/icons/ic_arrow_back_24px.svg')
	       .icon('arrow_forward', 'images/icons/ic_arrow_forward_24px.svg')
	       .icon('close', 'images/icons/ic_close_24px.svg')
	       .icon('edit', 'images/icons/ic_edit_24px.svg')
	       .icon('email', 'images/icons/ic_email_24px.svg')
	       .icon('home', 'images/icons/ic_home_24px.svg')
	       .icon('info', 'images/icons/ic_info_24px.svg')
	       .icon('menu', 'images/icons/ic_menu_24px.svg')
	       .icon('message', 'images/icons/ic_message_24px.svg')
	       .icon('person', 'images/icons/ic_person_24px.svg')
	       .icon('place', 'images/icons/ic_place_24px.svg')
	       .icon('delete', 'images/icons/ic_delete_24px.svg')
	       .icon('tickets', 'images/icons/ic_local_play_48px.svg')
	       .icon('lifts', 'images/icons/ic_directions_car_48px.svg')
	       .icon('misc', 'images/icons/ic_forum_48px.svg')
	       .icon('sell', 'images/icons/ic_attach_money_48px.svg')
	       .icon('homeBig', 'images/icons/ic_home_48px.svg')
	       .icon('messageBig', 'images/icons/ic_message_48px.svg')
	       .icon('emailBig', 'images/icons/ic_email_48px.svg');
	  })
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html', 
        controller: 'MainCtrl'})
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
