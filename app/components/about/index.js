import angular from 'angular';

import AboutComponent from './about.component';

const AboutModule = angular
  .module('components.about', [])
  .component('about', AboutComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('about', {
        url: '/about',
        component: 'about',
      });
  })
  .name;

export default AboutModule;
