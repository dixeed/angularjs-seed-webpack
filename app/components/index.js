import angular from 'angular';

import Home from './home';
import RootComponent from './root.component';

const Components = angular
  .module('myApp.components', [
    Home,
  ])
  .component('root', RootComponent)
  .name;

export default Components;
