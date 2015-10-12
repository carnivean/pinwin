'use strict';

angular.module('pinApp')
  .controller('AddlinkCtrl', function ($scope, $http, Auth, $location) {
    $scope.errorMessage = '';
    $scope.message = '';

    $scope.links = [];

    var getMyLinks = function() {
        $http.get('/api/links/' + Auth.getCurrentUser().name)
          .success(function(data){
            $scope.links = data;
          })
          .error(function(err){
            $scope.errorMessage = 'Error while retrieving your data. Sorry... :-(';
          });
    }
  });
