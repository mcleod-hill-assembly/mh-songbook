const
  dummyjson = require('dummy-json')
  , partials = require('my-dummy-json/partials')
  , _ = require('lodash')
  ;

module.exports = {
  getSongs: function* (next){
    var myTemplateParser = _.partialRight(dummyjson.parse,{partials:partials});
    var myJsonParser = _.flow(myTemplateParser,JSON.parse);
    var json = myJsonParser(`[{{#repeat 100}}{{> song}}{{/repeat}}]`);
    this.response.body = json;
  }
};