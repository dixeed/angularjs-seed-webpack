(function() {
  'use strict';

  var angular = require('angular');
  var uiRouter = require('angular-ui-router');

  var componentsModule = require('./components');

  angular.module('myApp', [
    // have to use this syntax since we are not using ES6 
    uiRouter.default,
    componentsModule
  ])
  .config(appConfig);

  appConfig.$inject = [ '$locationProvider', '$urlRouterProvider' ];

  function appConfig($locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    if (process.env.NODE_ENV === 'prod') {
      $locationProvider.html5Mode(true);
    }
  }

}());
