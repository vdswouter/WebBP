/**
 * Created by wouter on 24/12/14.
 */
var TrackDetailViewController = Backbone.View.extend({
    tagName: "div",
    className: "overlay",
    template: tpl.trackDetail,

    initialize: function () {
        _.bindAll(this);

        // this class can just be called and will get the data from the
        // service by itself. so no parameters or setters are needed.
        this.playlistService = PlaylistService.getInstance();

        this.addEventListeners();
        this.render();
    },

    events: {
        "click .button-close": "removeFromParrent"
    },

    addEventListeners: function () {

    },

    render: function () {
        console.log(this.playlistService.selectedTrack);
        var html = this.template( this.playlistService.selectedTrack.toJSON() );
        this.$el.html(html);
    },

    removeFromParrent: function () {
        this.$el.remove();
    }
});