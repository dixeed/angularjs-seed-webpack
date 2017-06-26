import angular from 'angular';

import EndpointService from './endpoint.service';

const services = angular
  .module('myApp', [])
  .service('EndpointService', EndpointService)
  .name;

export default services;
