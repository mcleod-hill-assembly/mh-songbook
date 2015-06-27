define([
    'jquery',
    'underscore',
    'backbone',
    'collections/SongList',
    'views/index/SongIndex',
    'views/GoogleAnalytics'
], function($, _, Backbone, SongList, SongIndex, GA){

    return Backbone.Router.extend({
        routes: {
            "":"index",
            "index":"index",
            "song/:songslug":"song"
        },

        initialize: function(){
            this.ga=new GA();
            this.ga.trackPageView();
            var songs = new SongList({
                url: BUCKET_URL,
                songDir: SONG_DIR
            });
            new SongIndex({
                collection: songs
            });
        },

        index: function() {},

        song: function(songSlug) {
            if ($("#index-spinner").is(":visible")){
                var me=this;
                setTimeout(function(){
                    me.song(songSlug);
                },1000);
            } else {
                var el = $("a#"+songSlug);
                if (el.length > 0){
                    $('html, body').animate({
                        scrollTop: el.offset().top
                    }, SCROLL_TO_SONG_RATE, function(){
                        el.click();
                    });
                }
            }
        }
    });
});