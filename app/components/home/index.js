(function() {
  'use strict';

  var angular = require('angular');

  var homeModuleName = angular
    .module('myApp.components.home', [])
    .name;

  require('./home.component');
  require('./home.controller');

  module.exports = homeModuleName;
}());
