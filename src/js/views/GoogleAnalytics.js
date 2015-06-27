define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    return Backbone.View.extend({
        initialize: function(){
            if (GA_SNIPPET_INCLUDED==false){
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                ga('create', 'UA-64322991-1', 'auto');
                GA_SNIPPET_INCLUDED=true;
            }
        },
        trackPageView:function(){
            ga('send', 'pageview');
        },
        trackSongEvent:function(filename){
            ga('send', 'event', 'song', 'click', {'page': filename});
        }
    });

});