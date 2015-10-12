'use strict';

angular.module('pinApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/addlink', {
        templateUrl: 'app/addlink/addlink.html',
        controller: 'AddlinkCtrl',
        authenticate: true
      });
  });
