define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    return Backbone.View.extend({
        retract:function(){
            this.$el.css('visibility','hidden');
            this.$el.slideUp("fast");
        }
    });
});