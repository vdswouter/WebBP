/**
 * Created by wouter on 23/12/14.
 */
var PlaylistService = Backbone.Class.extend({

    initialize: function(){
        _.bindAll(this);

        this.selectedTrack = null;
        this.currentPlaylist = null;

    },

    setSelectedTrack: function(tracknumber) {
        this.selectedTrack = this.currentPlaylist.get('tracks')[tracknumber];
        bean.fire(this, "TRACK_SELECTED");
    },

    loadPlaylist: function(playlistname){
        var self = this;
        UnitOfWork.getInstance().playlistRepository.getPlaylist(playlistname, function(playlist){
            self.currentPlaylist = playlist;
            console.log(self.currentPlaylist.get('tracks').length);
            bean.fire(self, "PLAYLIST_LOADED");
        });
    }

});
_.extend(PlaylistService, Backbone.Singleton);