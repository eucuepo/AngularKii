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
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        resolve: {
          factory: checkRouting
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  var checkRouting= function ($q, $rootScope, $location, Global) {
    if (Global.user) {
        return true;
    } else {
        return false;
        /* 
        // try to re-login
        var defered = $q.defer();
        $http.post("/loadUserProfile", { userToken: "blah" })
            .success(function (response) {
                $rootScope.userProfile = response.userProfile;
                defered.resolve(true);
            })
            .error(function () {
                defered.reject();
                $location.path("/");
             });
        return defered.promise;
        */
    }
};
