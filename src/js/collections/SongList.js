define([
  'jquery',
  'underscore',
  'backbone',
  'models/SongListing'
], function($, _, Backbone, SongListing){
  return Backbone.Collection.extend({
    model:SongListing,
    initialize: function(options){
      this.url = options.url;
      this.url += "?delimiter=/&prefix=";
      this.url += options.songDir;
    },
    fetchError: function(collection,response){
      console.log(response);
    },
    fetch: function(options){
      options = _.extend({
        dataType:"xml",
        reset:true,
        error:this.fetchError
      },options);
      return Backbone.Collection.prototype.fetch.call(this, options);
    },
    parse:function(data){
      var xml = $(data);
      return $.map(xml.find('Contents'), function(item) {
        item = $(item);
        return {
          filename: item.find('Key').text(),
          lastModified: item.find('LastModified').text(),
          size: item.find('Size').text(),
          type: 'file'
        }
      });
    }
  });

});