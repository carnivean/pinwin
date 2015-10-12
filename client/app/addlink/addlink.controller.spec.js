'use strict';

describe('Controller: AddlinkCtrl', function () {

  // load the controller's module
  beforeEach(module('pinApp'));

  var AddlinkCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddlinkCtrl = $controller('AddlinkCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
