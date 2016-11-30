import angular from 'angular';

import HomeComponent from './home.component';

const Home = angular
  .module('myApp.components.home', [])
  .component('home', HomeComponent)
  .config(homeRouteProvider)
  .name;

homeRouteProvider.$inject = [ '$stateProvider' ];

function homeRouteProvider($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      component: 'home',
      resolve: {
        title: function() {
          return 'I am the home title';
        }
      }
    });
}


export default Home;
