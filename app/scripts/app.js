'use strict';

angular.module('angularKiiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl'
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
