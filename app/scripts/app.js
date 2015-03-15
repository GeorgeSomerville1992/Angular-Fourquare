'use strict';

/**
 * @ngdoc overview
 * @name myTestAppApp
 * @description
 * # myTestAppApp
 *
 * Main module of the application.
 */
angular
  .module('myTestAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when("/flatLanders",{
        templateUrl: 'views/flatLand.html',
        controller:'StoreCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });

  });
