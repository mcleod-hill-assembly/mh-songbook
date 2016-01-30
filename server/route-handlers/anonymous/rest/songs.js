const
  dummyjson = require('dummy-json')
  , partials = require('my-dummy-json/partials')
  ;

module.exports = {
  getSongs: function* (next){
    this.response.body = dummyjson.parse(`[
    {{#repeat 100}}
      "{{> song}}"
    {{/repeat}}
    ]`,{partials:partials});
  }
};