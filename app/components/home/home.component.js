(function() {
  'use strict';

  var angular = require('angular');

  angular
    .module('myApp.components.home')
    .component('home', {
      template: require('./home.html'),
      bindings: {
        title: '<'
      },
      controller: 'HomeCtrl'
    })
    .config(homeRouteProvider);

  homeRouteProvider.$inject = [ '$stateProvider' ];

  function homeRouteProvider($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        component: 'home',
        resolve: {
          title: function() {
            return 'I am the home title';
          }
        }
      })
  }
}());
