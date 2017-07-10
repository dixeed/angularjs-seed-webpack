import angular from 'angular';

import HomeComponent from './home.component';

const Home = angular
  .module('myApp.components.home', [])
  .component('home', HomeComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('home', {
      url: '/',
      component: 'home',
      resolve: {
        title() {
          return 'I am the home title';
        },
      },
    });
  }).name;

export default Home;
