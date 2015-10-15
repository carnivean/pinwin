'use strict';

angular.module('pinApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mypins', {
        templateUrl: 'app/mypins/mypins.html',
        controller: 'MypinsCtrl'
      });
  });
