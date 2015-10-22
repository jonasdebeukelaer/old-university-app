// Declare app level module which depends on filters, and services
angular.module('unisalad', [
	'ngAnimate',
	'ngResource',
	'ngRoute',
  'ui.router',
  'LocalStorageModule',
  'ngMaterial'
	])
  .run(function($mdMedia, $rootScope) {
    FastClick.attach(document.body);
    $rootScope.wideScreen = $mdMedia('gt-md');
    })
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
     .icon('bed', 'images/icons/ic_hotel_24px.svg')
     .icon('tickets', 'images/icons/ic_local_play_48px.svg')
     .icon('lifts', 'images/icons/ic_directions_car_48px.svg')
     .icon('misc', 'images/icons/ic_forum_48px.svg')
     .icon('sell', 'images/icons/ic_attach_money_48px.svg')
     .icon('homeBig', 'images/icons/ic_home_48px.svg')
     .icon('messageBig', 'images/icons/ic_message_48px.svg')
     .icon('emailBig', 'images/icons/ic_email_48px.svg')
     .icon('callBig', 'images/icons/ic_call_48px.svg')
     .icon('arrow_down', 'images/icons/ic_keyboard_arrow_down_black_24px.svg')
     .icon('arrow_up', 'images/icons/ic_keyboard_arrow_up_black_24px.svg')
     .icon('put_back', 'images/icons/ic_call_missed_24px.svg');
  })
  .config( [
    '$compileProvider',
    function( $compileProvider )
    {   
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|tel|mailto|sms):/);
    }
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/main');
    $stateProvider
      .state('hello', {
        url: 'hello',
        templateUrl: 'views/hello.html'
      })
      .state('base', {
        url: '/',
        templateUrl: 'views/base.html',
        controller: 'AppCtrl'
      })
      .state('base.main', {
        url: 'main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('base.about', {
        url: 'about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('base.tool', {
        url: 'tool',
        templateUrl: 'views/tool.html',
        controller: 'ToolCtrl'
      })
      .state('base.login', {
        url: 'login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('base.confirmationsent', {
        url: 'confirmationsent',
        templateUrl: 'views/confirmationsent.html',
        controller: 'ConfirmationSentCtrl'
      })
      .state('base.admin_page', {
        url: 'admin_page',
        templateUrl: 'views/admin_page.html',
        controller: 'AdminPageCtrl'
      })
      .state('base.addpost', {
        url: 'addpost',
        templateUrl: 'views/addpost.html',
        controller: 'AddPostCtrl'
      })
      .state('base.tickets', {
        url: 'tickets',
        templateUrl: 'views/lists/listTickets.html',
        controller: 'ListviewCtrl'
      })
      .state('base.lifts', {
        url: 'lifts',
        templateUrl: 'views/lists/listLifts.html',
        controller: 'ListviewCtrl'
      })
      .state('base.houses', {
        url: 'houses',
        templateUrl: 'views/lists/listHouses.html',
        controller: 'ListviewCtrl'
      })
      .state('base.sales', {
        url: 'sales',
        templateUrl: 'views/lists/listSales.html',
        controller: 'ListviewCtrl'
      })
  }]);
