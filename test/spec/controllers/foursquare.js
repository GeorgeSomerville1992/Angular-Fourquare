'use strict';

describe('Controller: FoursquareCtrl', function () {

  // load the controller's module
  beforeEach(module('myTestAppApp'));

  var FoursquareCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FoursquareCtrl = $controller('FoursquareCtrl', {
      $scope: scope
    });
  }));
  // make some tests! 
  it('should dispatch a valid API request', function () {
    console.log("HELLOOOO")
    scope.foursquare("bar","london")
    expect(scope.foursquareAttractions.length).tobe(30)
    // expect(scope.awesomeThings.length).toBe(3);
  });
});