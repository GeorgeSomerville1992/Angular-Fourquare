'use strict';

/**
 * @ngdoc function
 * @name myTestAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myTestAppApp
 */
angular.module('myTestAppApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
