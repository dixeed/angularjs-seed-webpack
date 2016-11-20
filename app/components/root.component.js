(function() {
  'use strict';

  var angular = require('angular');

  angular
    .module('myApp.components')
    .component('root', {
      template: require('./root.html')
    });
}());
