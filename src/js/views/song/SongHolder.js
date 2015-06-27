define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  return Backbone.View.extend({
    render:function(song){
      this.$el.append(song);
    },
    extendSong:function(songLoader){
      this.$el.slideDown("slow",function(){
        songLoader.$el.slideUp("fast");
      });
    },
    retractSong:function(){
      this.$el.slideUp("slow");
    },
    toggleSong:function(){
      this.$el.slideToggle("slow");
    },
    isItEmpty:function(){
      return _.isEmpty(this.$el.html());
    }
});

});