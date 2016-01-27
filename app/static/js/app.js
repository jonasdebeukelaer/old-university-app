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
     .icon('put_back', 'images/icons/ic_call_missed_24px.svg')
     .icon('more_vert', 'images/icons/ic_more_vert_24px.svg')
     .icon('flag', 'images/icons/ic_flag_24px.svg')
     .icon('remove', 'images/icons/ic_remove_circle_outline_24px.svg')
     .icon('tick', 'images/icons/ic_check_24px.svg')
     .icon('mood_bad', 'images/icons/ic_mood_bad_24px.svg');
  })
  .config( [
    '$compileProvider',
    function( $compileProvider )
    {   
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|tel|mailto|sms):/);
    }
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('hello', {
        url: '/',
        templateUrl: 'views/hello.html',
        controller: 'HelloCtrl'
      })
      .state('pre', {
        url: '/do',
        templateUrl: 'views/pre.html',
        controller: 'PreCtrl'
      })
      .state('pre.main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('pre.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('pre.confirmationsent', {
        url: '/confirmationsent',
        templateUrl: 'views/confirmationsent.html',
        controller: 'ConfirmationSentCtrl'
      })
      .state('pre.about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('base', {
        url: '/app',
        templateUrl: 'views/base.html',
        controller: 'AppCtrl'
      })
      .state('base.about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('base.mod_page', {
        url: '/mod',
        templateUrl: 'views/mod_page.html',
        controller: 'ModPageCtrl'
      })
      .state('base.admin_page', {
        url: '/admin',
        templateUrl: 'views/admin_page.html',
        controller: 'AdminPageCtrl'
      })
      .state('base.addpost', {
        url: '/addpost',
        templateUrl: 'views/addpost.html',
        controller: 'AddPostCtrl'
      })
      .state('base.tickets', {
        url: '/tickets',
        templateUrl: 'views/list_template.html',
        controller: 'ListTicketsCtrl'
      })
      .state('base.lifts', {
        url: '/lifts',
        templateUrl: 'views/list_template.html',
        controller: 'ListLiftsCtrl'
      })
      .state('base.houses', {
        url: '/houses',
        templateUrl: 'views/list_template.html',
        controller: 'ListHousesCtrl'
      })
      .state('base.sales', {
        url: '/sales',
        templateUrl: 'views/list_template.html',
        controller: 'ListSalesCtrl'
      })
      .state('base.general', {
        url: '/general',
        templateUrl: 'views/list_template.html',
        controller: 'ListGeneralCtrl'
      })
      .state('base.profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
  }]);
