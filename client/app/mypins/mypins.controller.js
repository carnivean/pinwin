'use strict';

angular.module('pinApp')
  .controller('MypinsCtrl', function ($scope, $http, Auth, myModal) {
    $scope.errorMessage = '';
    $scope.message = '';

    $scope.links = [];

    $scope.loaded = false;

    var getMyLinks = function() {
      $http.get('/api/links/user/' + Auth.getCurrentUser().name)
        .success(function(data){
          $scope.links = data;
          $scope.loaded = true;
        })
        .error(function(err){
          $scope.errorMessage = 'Error while retrieving your data. Sorry... :-(';
          $scope.loaded = true;
        });
    };

    $scope.showModal = function() {
      myModal.activate();
    };

    $scope.showAModal = function() {
      console.log('Showing a modal');
      ModalService.showModal({
        templateUrl: "app/addlink/addlink.html",
        controller: "AddlinkCtrl"
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        modal.close.then(function() {

        });
      });
    };

    getMyLinks();
  });
