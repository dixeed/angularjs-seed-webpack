(function() {
  'use strict';

  var angular = require('angular');

  var componentsModule = require('./components');

  angular.module('myApp', [
    componentsModule
  ])
  .config(appConfig);

  appConfig.$inject = [ '$locationProvider' ];

  function appConfig($locationProvider) {
    if (process.env.NODE_ENV === 'prod') {
      $locationProvider.html5Mode(true);
    }
  }

}());
