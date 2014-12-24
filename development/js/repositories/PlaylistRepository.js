/**
 * Created by wouter on 24/12/14.
 */

var PlaylistRepository = Backbone.Class.extend({

    initialize: function(context){
        this.context = context;
    },

    getPlaylist: function(playlistname, callback){
        this.context.getJSON('playlist.json', function(json){
            var playlist = json.playlist[playlistname];
            var result = [];
            for(var i = 0; i < playlist.length; i++){
                var track = new Track();
                track.set(playlist[i]);
                result.push(track);
            }
            callback(result);
        });
    }

});
_.extend(PlaylistRepository, Backbone.Singleton);


