(function() {
  'use strict';

  var angular = require('angular');

  var componentModule = angular
    .module('myApp.components', [
      require('./home')
    ])
    .name;

  require('./root.component');

  module.exports = componentModule;
}());
