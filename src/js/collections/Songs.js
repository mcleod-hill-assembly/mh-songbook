define([
  'jquery',
  'underscore',
  'backbone',
  'models/Song'
], function($, _, Backbone, Song){
  return Backbone.Collection.extend({
    model:Song
  });

});