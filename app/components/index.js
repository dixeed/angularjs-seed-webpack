import angular from 'angular';

import Home from './home';
import About from './about';
import RootComponent from './root.component';

const Components = angular
  .module('myApp.components', [Home, About])
  .component('root', RootComponent).name;

export default Components;
