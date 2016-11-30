import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './commons/bootstrap.scss';
import Components from './components';

angular.module('myApp', [
  uiRouter,
  Components,
])
.config(appConfig);

appConfig.$inject = [ '$locationProvider', '$urlRouterProvider' ];

function appConfig($locationProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  if (process.env.NODE_ENV === 'prod') {
    $locationProvider.html5Mode(true);
  }
}
