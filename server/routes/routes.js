"use strict";

const
    Router = require('koa-router');


module.exports.anonymousRouteMiddleware = function(passport) {
  const
    routes = new Router(),
    pages = require('route-handlers/anonymous/pages');

  routes.get('/', function*() {
    this.redirect('/application#/home-page');
  });
  routes.get('/application', pages.applicationPage);

  return routes.middleware();
};

module.exports.microserviceRouteMiddleware = function() {
  const rest = new Router();
  const action = function(module, method){
    return require('route-handlers/anonymous/rest/' + module)[method];
  };

  rest.get("/rest/songs/", action('songs','getSongs'));

  return rest.middleware();
};

