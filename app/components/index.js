(function() {
  'use strict';

  var angular = require('angular');

  var componentModule = angular
    .module('myApp.components', [])
    .name;

  require('./root.component');

  module.exports = componentModule;
}());
