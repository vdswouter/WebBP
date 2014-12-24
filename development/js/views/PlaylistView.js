/**
 * Created by wouter on 24/12/14.
 */
var PlaylistView = Backbone.View.extend({
    tagName: "section",
    id: "playlist",
    template: tpl.playlistMenu,

    initialize: function(){
        _.bindAll(this);

        this.bind();
        this.render();
    },

    events: {
        'click nav>button':'buttonClicked',
        'click .track': 'trackClicked'

    },

    bind: function(){

    },
    
    trackClicked: function(e){
        var tracknumber = $(e.currentTarget).attr('data-tracknumber');
        PlaylistService.getInstance().setSelectedTrack(tracknumber);

        bean.fire(this, "TRACK_CLICKED");
    },
    
    buttonClicked: function(e){
        $('nav>button').removeClass('button-pill').addClass('button-secondary-pill');
        $(e.currentTarget).removeClass('button-secondary-pill').addClass('button-pill');
        this.$loader.removeClass('is-hidden');

        var playlistname = $(e.currentTarget).attr('data-playlist');

        PlaylistService.getInstance().loadPlaylist(playlistname, this.playlistLoaded);

    },
    
    playlistLoaded: function(){
        this.$el.find('.playlist').remove();

        var playlist =[];

        $(PlaylistService.getInstance().currentPlaylist).each(function(i){
            var songdata = PlaylistService.getInstance().currentPlaylist[i].toJSON();
            songdata.i = i;
            playlist.push(songdata);
        });

        var list = tpl.playlist({tracks: playlist})

        this.$loader.addClass('is-hidden');
        this.$el.append(list);
    },

    render: function(){
        this.$el.html(this.template());

        this.$loader = this.$el.find('.playlist-preloader');
    },

    removeFromParrent: function(){
        this.$el.remove();
    }
});