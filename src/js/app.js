define([
  'jquery',
  'underscore',
  'backbone',
  'router/DefaultRouter'
], function($, _, Backbone, Router){
  var router = new Router();
  Backbone.history.start();
});