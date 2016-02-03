module.exports = {
  song: '{\
    "verses":[{{#repeat 5}}[{{#repeat 4}}"{{words 5}}"{{/repeat}}]{{/repeat}}],\
    "title":"{{words 3 uppercase=true}}",\
    "meta": {\
      "order":[0,1,2,3,4,2],\
      "verses":[0,1,3,4],\
      "choruses":[2],\
      "bridges":[],\
      "author": "{{firstName}} {{lastName}}"\
    }\
  }'
};