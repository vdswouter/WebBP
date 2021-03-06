/**
 * Created by wouter on 24/12/14.
 */

var PlaylistRepository = Backbone.Class.extend({

    _playlist: null,

    initialize: function(context){
        this.context = context;
    },

    getPlaylist: function(playlistname, callback){
        var self = this;
        
        console.log(this);
        
        
        this.context.getJSON('playlist.json', function(json){
            var playlistJSON = json.playlist[playlistname];
            self._playlist = null;
            self._playlist = new Playlist();

            self._playlist.set('playlistname', playlistname);

            for(var i = 0; i < playlistJSON.length; i++){
                var track = UnitOfWork.getInstance().trackRepository.getTrackFromObject(playlistJSON[i]);
                self._playlist.addTrack(track);
            }

            return callback(self._playlist);
        });
    }

});

