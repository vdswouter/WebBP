/**
 * Created by wouter on 24/12/14.
 */
var PlaylistViewController = Backbone.View.extend({
    tagName: "section",
    id: "playlist",
    template: tpl.playlistMenu,

    initialize: function () {
        _.bindAll(this);

        this.playlistService = PlaylistService.getInstance();

        this.addEventListeners();
        this.render();
    },

    events: {
        'click nav>button': 'buttonClicked',
        'click .track': 'trackClicked'

    },

    addEventListeners: function () {
        bean.on(this.playlistService, "PLAYLIST_LOADED", this.playlistLoaded);
    },

    trackClicked: function (e) {
        var tracknumber = $(e.currentTarget).attr('data-tracknumber');
        this.playlistService.setSelectedTrack(tracknumber);
    },

    buttonClicked: function (e) {
        $('nav>button').removeClass('button-pill').addClass('button-secondary-pill');
        $(e.currentTarget).removeClass('button-secondary-pill').addClass('button-pill');
        this.$loader.removeClass('is-hidden');

        var playlistname = $(e.currentTarget).attr('data-playlist');
        this.playlistService.loadPlaylist(playlistname);

    },

    playlistLoaded: function () {
        this.$el.find('.playlist').remove();

        var list = tpl.playlist({
            playlist: this.playlistService.currentPlaylist.toJSON()
        });

        this.$loader.addClass('is-hidden');
        this.$el.append(list);
    },

    render: function () {
        this.$el.html(this.template());

        this.$loader = this.$el.find('.playlist-preloader');
    },

    removeFromParrent: function () {
        this.$el.remove();
    }
});