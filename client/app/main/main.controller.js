'use strict';

angular.module('pinApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.links = [];

    var getMyLinks = function() {
      $http.get('/api/links')
        .success(function(data){
          $scope.links = data;
          $scope.loaded = true;
          socket.syncUpdates('link', $scope.links);
        })
        .error(function(err){
          $scope.errorMessage = 'Error while retrieving your data. Sorry... :-(';
          $scope.loaded = true;
        });
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('links');
    });

    $scope.addLink = function(id) {
      $http.get('/api/links/' + id)
        .success(function(data) {
          if (data.username.indexOf(Auth.getCurrentUser().name) === -1) {
            data.username.push(Auth.getCurrentUser().name);
            $http.put('/api/links/' + data._id, data)
              .success(function(data){
                $scope.message = 'Everything worked. Successfully updated.';
              })
              .error(function(data) {
                $scope.errorMessage = 'Something went wrong... Sorry :-(';
              });
          }
        })
        .error(function(data) {
          $scope.errorMessage = 'Something went wrong... Sorry :-(';
        });
    };

    $scope.addLike = function (id) {
      $http.get('/api/links/' + id)
        .success(function(data) {
          if (data.likes.indexOf(Auth.getCurrentUser().name) === -1) {
            data.likes.push(Auth.getCurrentUser().name);
            $http.put('/api/links/' + data._id, data)
              .success(function(data){
                $scope.message = 'Everything worked. Successfully updated.';
              })
              .error(function(data) {
                $scope.errorMessage = 'Something went wrong... Sorry :-(';
              });
          }
        })
        .error(function(data) {
          $scope.errorMessage = 'Something went wrong... Sorry :-(';
        });
    };

    getMyLinks();
  });
