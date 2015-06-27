define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  return Backbone.Model.extend({
    parse: function(obj){
      obj = _.extend({},this.generateMetaData(obj.filename),obj);
      return Backbone.Model.prototype.parse.call(this,obj);
    },
    generateMetaData:function(filename){
      var file = _.clone(filename);
      var title = file.split(".")[0].replace("songs/","");
      var titleWords = title.split("_");
      var uppercaseWords=[];
      _.each(titleWords,function(word,i){
        uppercaseWords[i] = word.charAt(0).toUpperCase() + word.slice(1);
      });
      return {
        name: uppercaseWords.join(" "),
        elementId: titleWords.join("-")
      };
    }
  });
});