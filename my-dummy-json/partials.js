module.exports = {
  song: `{
    "verses":[
      {{#repeat 5}}
      {{>stanza}}
      {{/repeat}}
    ],
    "title":"Song {{@index}} in the index",
    "meta": {
      "order":[0,1,2,3,4,2],
      "verses":[0,1,3,4],
      "choruses":[2],
      "bridges":[],
      "author": "{{firstName}} {{lastName}}"
    }
  }`,
  stanza: `[
    {{#repeat 4}}
    "Line {{@index}} of this verse"
    {{/repeat}}
  ]`
};