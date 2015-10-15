'use strict';

angular.module('pinApp')
  .controller('AddlinkCtrl', function ($scope, $http, Auth) {
    $scope.errorMessage = '';
    $scope.message = '';

    $scope.url = '';

    // checks for a valid extension
    var checkURL = function(url) {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    };

    $scope.inputChanged = function() {

    };
  });
