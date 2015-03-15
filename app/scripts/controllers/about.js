'use strict';

/**
 * @ngdoc function
 * @name myTestAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myTestAppApp
 */
angular.module('myTestAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
