(function() {
  'use strict';

  var angular = require('angular');

  var componentsModule = require('./components');

  angular.module('myApp', [
    componentsModule
  ]);

}());
