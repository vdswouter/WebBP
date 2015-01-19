/**
 * Created by wouter on 24/12/14.
 */
var TrackDetailViewController = Backbone.View.extend({
    tagName: "div",
    className: "overlay",
    template: tpl.trackDetail,

    initialize: function () {
        _.bindAll(this);

        this.addEventListeners();
        this.render();
    },

    events: {
        "click .button-close": "removeFromParrent"
    },

    bind: function () {

    },

    render: function () {
        this.$el.html(this.template(PlaylistService.getInstance().selectedTrack.toJSON()));
    },

    removeFromParrent: function () {
        this.$el.remove();
    }
});