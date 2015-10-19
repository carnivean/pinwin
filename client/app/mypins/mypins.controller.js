'use strict';

angular.module('pinApp')
  .controller('MypinsCtrl', function ($scope, $http, Auth, myModal, socket) {
    $scope.errorMessage = '';
    $scope.message = '';

    $scope.links = [];

    $scope.loaded = false;

    $scope.deleteLink = function(id) {
      $http.delete('/api/links/' + id)
        .success(function() {
          $scope.message = 'Successfully deleted!';
        })
        .error(function() {
          $scope.errorMessage = 'Error while deleting!';
        });
    };

    var getMyLinks = function() {
      $http.get('/api/links/user/' + Auth.getCurrentUser().name)
        .success(function(data){
          $scope.links = data;
          $scope.loaded = true;
          socket.syncUpdates('link', $scope.links);
        })
        .error(function(){
          $scope.errorMessage = 'Error while retrieving your data. Sorry... :-(';
          $scope.loaded = true;
        });
    };

    $scope.showModal = function() {
      myModal.activate();
    };

    getMyLinks();
  });
