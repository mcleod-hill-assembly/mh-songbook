define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  return Backbone.Model.extend({
    initialize: function(options){
      this.url = "/"+options.filename;
      this.id=options.id;
    },
    fetch: function(){
      var me=this;
      $.get(this.url,function(song){
        me.song = song;
        me.trigger('change');
      });
    }
  });
});