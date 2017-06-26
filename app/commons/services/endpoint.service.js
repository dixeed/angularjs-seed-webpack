import angular from 'angular';
import endpointConf from '../endpoint.conf.json';

export default class EndpointService {
  constructor($resource) {
    'ngInject';

    this.$resource = $resource;
  }

  /*
   * Gets the endPoint resource for contacting the API.
   *    @endpoint: the endpoint relative url with its params (must start with a '/').
   *      Exemple: "/customers/:id/:slug".
   *    @extraActions: extra actions to add on the returned resource object. Overrides the defaults.
   *
   * Return: a Resource object.
   */
  getResource(endpoint, extraActions = {}) {
    const url = `${endpointConf.backend_url}${endpoint}`;
    const actions = {};

    actions.update = { method: 'PUT' };
    actions.updateBulk = { method: 'PUT', isArray: true };
    actions.search = { method: 'GET', isArray: true, params: { slug: 'search' } };

    const properties = Object.keys(extraActions);

    // Merges the default actions with the provided.
    angular.forEach(properties, (prop) => { actions[prop] = extraActions[prop]; });

    return this.$resource(url, null, actions);
  }

  getUrl(endpoint) {
    if (angular.isUndefined(endpoint) || endpoint === null || (endpoint !== '' && (endpoint.startsWith('http://') || endpoint.startsWith('https://')))) {
      return endpoint;
    }

    let result = endpoint;

    if (endpoint !== '' && !endpoint.startsWith('/')) {
      result = `/${endpoint}`;
    }

    return `${endpointConf.backend_url}${result}`;
  }

  getFrontendUrl() {
    return endpointConf.frontend_url;
  }
}
