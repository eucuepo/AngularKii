'use strict';

angular.module('angularKiiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ngDragDrop'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/projects', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        resolve: {
          factory: checkRouting
        }
      })
      .when('/issues', {
        templateUrl: 'views/issues.html',
        controller: 'IssuesCtrl',
        resolve: {
          factory: checkRouting
        }
      })
      .when('/add_issue', {
        templateUrl: 'views/add_issue.html',
        controller: 'IssuesCtrl',
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
        $location.path("/");
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
