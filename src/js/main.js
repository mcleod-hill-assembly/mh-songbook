require.config({
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/underscore.min',
    backbone: 'libs/backbone/backbone.min'
  }
});

var BUCKET_URL='http://mh-songbook.com.s3.amazonaws.com';
var SONG_DIR='songs/';
var GA_SNIPPET_INCLUDED=false;
var SCROLL_TO_SONG_RATE=1600;

require(['app']);