import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import oclazyload from 'oclazyload';

import './commons/bootstrap.scss';
import Components from './components';

angular.module('myApp', [
  uiRouter,
  Components,
  oclazyload,
])
.config(($locationProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  if (process.env.NODE_ENV === 'prod') {
    $locationProvider.html5Mode(true);
  }
});
