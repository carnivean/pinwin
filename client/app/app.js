'use strict';

angular.module('pinApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'wu.masonry',
  'btford.modal'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  .factory('myModal', function (btfModal) {
    return btfModal({
      controller: 'AddlinkCtrl',
      templateUrl: 'app/addlink/addlink.html'
    });
  })
  .controller('MyModalCtrl', function (myModal) {
    this.closeMe = myModal.deactivate;
  })
  .directive('errSrc', function() {
    return {
      link: function(scope, element, attrs) {
        var defaultSrc = attrs.src;
        element.bind('error', function() {
          if(attrs.errSrc) {
            element.attr('src', attrs.errSrc);
          }
          else if(attrs.src) {
            element.attr('src', defaultSrc);
          }
        });
      }
    }
  })
  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });
