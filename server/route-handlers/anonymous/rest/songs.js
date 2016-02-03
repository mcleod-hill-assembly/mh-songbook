const
  dummyjson = require('dummy-json')
  , partials = require('my-dummy-json/partials')
  , helpers = require('my-dummy-json/helpers')
  , _ = require('lodash')
  ;

module.exports = {
  getSongs: function* (next){
    var myTemplateParser = _.partialRight(dummyjson.parse,{partials:partials,helpers:helpers});
    var myJsonParser = _.flow(myTemplateParser,JSON.parse);
    //var fs = require('fs'); fs.writeFileSync('fake-songs.json',myTemplateParser("[{{#repeat 100}}{{> song}}{{/repeat}}]"));
    this.response.body = myJsonParser("[{{#repeat 100}}{{> song}}{{/repeat}}]");
  }
};