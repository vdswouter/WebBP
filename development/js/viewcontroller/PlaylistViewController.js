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
        // the playlistservice setter wil handle the event dispatching/routing to show the detail view
        this.playlistService.setSelectedTrack(tracknumber);
    },

    buttonClicked: function (e) {
        // active state logic
        $('nav>button').removeClass('button-pill').addClass('button-secondary-pill');
        $(e.currentTarget).removeClass('button-secondary-pill').addClass('button-pill');

        // show the preloader
        this.$loader.removeClass('is-hidden');

        var playlistname = $(e.currentTarget).attr('data-playlist');
        this.playlistService.loadPlaylist(playlistname);
        // no further callbacks, as the service will fire events when the loading is finished.

    },

    playlistLoaded: function () {
        // clear old playlist if there is one.
        this.$el.find('.playlist').remove();


        // as handlebars can't directly read backbone models we call the toJSON function.
        var list = tpl.playlist({
            playlist: this.playlistService.currentPlaylist.toJSON()
        });

        // hide the preloader and put the list on screen.
        this.$loader.addClass('is-hidden');
        this.$el.append(list);
    },

    render: function () {
        this.$el.html(this.template());

        // DOM caching
        this.$loader = this.$el.find('.playlist-preloader');
    },

    removeFromParrent: function () {
        this.$el.remove();
    }
});