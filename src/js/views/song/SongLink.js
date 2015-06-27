define([
  'jquery',
  'underscore',
  'backbone',
  'collections/Songs',
  'models/Song',
  'views/song/SongHolder',
  'views/song/SongLoader',
  'views/GoogleAnalytics'
], function($, _, Backbone, Songs, Song, SongHolder, SongLoader, GA){
  return Backbone.View.extend({
    collection:Songs,
    model:Song,
    initialize:function(options){
      this.$el=$(options.el);
      this.collection=options.songs;
      this.createAssociatedViews();
      this.createSongModel(options);
      this.registerEventHandling();
      this.ga = new GA();
    },
    render:function(){
      this.songHolder.render(this.model.song);
      this.ga.trackSongEvent(this.$el.attr('href'));
    },
    events: {
      'click': 'triggerWorkFlow'
    },
    triggerWorkFlow: function(e){
      this.preventDefaultLinkBehaviour(e);
      if (this.songHolder.isItEmpty()){
        this.songLoader.$el.show();
        this.model.fetch();
      } else {
        this.songHolder.toggleSong();
      }
    },
    createSongModel:function(options){
      var modelId=Math.random().toString(36).substring(7);
      this.modelId=modelId;
      this.model = new Song({
        filename:options.filename,
        id:modelId
      });
    },
    createAssociatedViews:function(){
      this.songLoader=new SongLoader({
        el:this.$el.next('.song-spinner')
      });
      this.songHolder=new SongHolder({
        el:this.$el.next('.song-spinner').next('.song-holder')
      });
    },
    registerEventHandling:function(){
      this.model.bind('change',this.modelCallback,this);
      this.collection.bind('add',this.collectionCallback,this);
    },
    modelCallback:function(){
      this.collection.add(this.model);
    },
    collectionCallback:function(model){
      //this is a shared collection - check to see if
      //your model was added, or if this a event is
      //originating from a different view's model
      if (this.modelId==model.get('id')){
        this.render();
        this.songHolder.extendSong(this.songLoader);
      } else {
        this.songHolder.retractSong();
      }
    },
    preventDefaultLinkBehaviour:function(event){
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  });

});