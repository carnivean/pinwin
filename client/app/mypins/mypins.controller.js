'use strict';

angular.module('pinApp')
  .controller('MypinsCtrl', function ($scope, $http, Auth) {
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
    };

    getMyLinks();
  });
