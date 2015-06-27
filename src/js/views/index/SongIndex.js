define([
  'jquery',
  'underscore',
  'backbone',
  'collections/SongList',
  'collections/Songs',
  'views/song/SongLink',
  'views/index/IndexLoader',
  'text!/templates/song-index.html'
], function($, _, Backbone, SongList, Songs, SongLink, IndexLoader, index){
  return Backbone.View.extend({
    collection:SongList,
    el: $('#song-index'),
    render: function(){
      var songs=[];
      this.collection.each(function(model){
        songs.push(model.toJSON());
      });
      var template = _.template(index)({songs:this.collection.toJSON()});
      this.$el.append($(template).html());
      this.createAssociatedViews(songs);
      this.indexLoader.retract();
    },
    initialize:function(options){
      this.indexLoader=new IndexLoader({el: $("#index-spinner")});
      this.collection=options.collection;
      this.collection.bind('reset', _.bind(this.render,this));
      this.collection.fetch();
    },
    createAssociatedViews:function(songs){
      var collection = new Songs();
      _.each(songs,function(song){
        new SongLink({
          songs: collection,
          el: 'a#'+song.elementId,
          filename: song.filename
        });
      });
    }
  });

});