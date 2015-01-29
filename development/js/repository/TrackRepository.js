/**
 * Created by wouter on 24/12/14.
 */

var TrackRepository = Backbone.Class.extend({

    initialize: function(){

    },

    getTrackFromObject: function(obj){
        var track = new Track();

        track.set('title',      obj.title);
        track.set('artist',     obj.artist);
        track.set('label',      obj.label);
        track.set('image',      obj.image);
        track.set('playlist',   obj.playlist);
        track.set('artist_id',  obj.artist_id);
        track.set('status',     obj.status);

        return track;
    }

});