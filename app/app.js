import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import oclazyload from 'oclazyload';
import uiNotification from 'angular-ui-notification';

import './commons/bootstrap.scss';
import Components from './components';

angular.module('myApp', [
  uiRouter,
  Components,
  oclazyload,
  uiNotification,
])
.config(($locationProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  if (process.env.NODE_ENV === 'prod') {
    $locationProvider.html5Mode(true);
  }
})
.run(($state, Notification, $log) => {
  'ngInject';

  $state.defaultErrorHandler((error) => {
    Notification.error({  message: `You cannot perform this operation` });
    const { message, statusCode } = error.detail.data;
    $log.error(`Erreur ${statusCode} : ${message}`);
  });
});
