import RouteException from './route-exception';

function setDefaults(config) {
  config.urls = [];
  config.resolve = {};
}

var config = Symbol('config');

export default class RouteModel {
  constructor(name) {
    if (!name) {
      throw RouteException.noControllerName();
    }

    this[config] = {};
    this[config].controller = name;

    setDefaults(this[config]);
  }

  getControllerName() {
    return this[config].controller;
  }

  /**
   * Set angular module name
   * @param name
   */
  setApplicationName(name) {
    this[config].application = name;
  }

  hasApplication() {
    return this[config].application;
  }

  getApplicationName() {
    return this[config].application;
  }

  /**
   * Add url
   * @param url
   */
  addUrl(url) {
    this[config].urls.push(url);
  }

  getUrls() {
    return this[config].urls;
  }

  /**
   *
   * @param template
   */
  setTemplate(template) {
    if (this[config].templateUrl) {
      throw RouteException.templateUrlAlreadyExists();
    }

    this[config].template = template;
  }

  getTemplate() {
    return this[config].template;
  }

  /**
   *
   * @param templateUrl
   */
  setTemplateUrl(templateUrl) {
    if (this[config].template) {
      throw RouteException.templateAlreadyExists();
    }

    this[config].templateUrl = templateUrl;
  }

  getTemplateUrl() {
    return this[config].templateUrl;
  }

  /**
   *
   */
  addResolve() {
    var resolve = null;
    if (arguments.length == 1) {
      resolve = arguments[0];
    } else if (arguments.length == 2) {
      resolve = {
        [arguments[0]]: arguments[1]
      }
    } else {
      throw RouteException.wrongResolveArguments();
    }

    for (var key of Object.keys(resolve)) {
      this[config].resolve[key] = resolve[key];
    }
  }

  getResolve() {
    return this[config].resolve;
  }

  /**
   * Check if at least of one url was attached
   * @returns {boolean}
   */
  hasUrl() {
    return !!this.urls.length;
  }

  setUrlBuilder(urlBuilder) {
    this[config].urlBuilder = urlBuilder;
  }

  hasUrlBuilder() {
    return !!this[config].urlBuilder || this[config].urls.length == 1;
  }

  /**
   * Get url builder :D
   * @returns {function}
   */
  getUrlBuilder() {
    return this[config].urlBuilder ? this[config].urlBuilder : this[config].urls[0];
  }
}