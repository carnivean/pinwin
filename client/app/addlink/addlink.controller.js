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
      if(checkURL($scope.input)) {
        $scope.url = $scope.input;
      }
    };

    $scope.submitLink = function() {
        if ($scope.url != '') {
          $scope.errorMessage = '';
          var newEntry = {
            username: [Auth.getCurrentUser().name],
            url: $scope.url,
            likes: [Auth.getCurrentUser().name]
          };

          $http.post('/api/links', newEntry)
            .success(function(data){
                $scope.message = ' Your link was successfully added. :-)';
            })
            .error(function(data) {
                $scope.errorMessage = 'Something went wrong during the upload of your link, sorry :-(';
            });
        } else {
          $scope.errorMessage = ' Please enter a link before submitting. Thanks!';
        }

    };
  });
