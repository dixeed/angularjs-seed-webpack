import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import oclazyload from 'oclazyload';
import uiNotification from 'angular-ui-notification';
import ngResource from 'angular-resource';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';

import './commons/bootstrap.scss';
import Components from 'components';
import Services from 'commons/services';

angular
  .module('myApp', [
    uiRouter,
    oclazyload,
    uiNotification,
    ngResource,
    ngAnimate,
    ngSanitize,
    Services,
    Components,
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

    $state.defaultErrorHandler(error => {
      Notification.error({ message: `You cannot perform this operation` });
      const { message, statusCode } = error.detail.data;
      $log.error(`Erreur ${statusCode} : ${message}`);
    });
  });
