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
        this.selectedTrack = this.currentPlaylist[tracknumber];
    },

    loadPlaylist: function(playlistname, callback){
        var that = this;
        UnitOfWork.getInstance().playlistRepository.getPlaylist(playlistname, function(playlist){
            that.currentPlaylist = playlist;
            return callback();
        });
    }

});
_.extend(PlaylistService, Backbone.Singleton);