/**
 * Created by wouter on 24/12/14.
 */
var Playlist = Backbone.Model.extend({

    // Remember that in JavaScript, objects are passed by reference, so if you include an object as a default value, it will be shared among all instances. Instead, define defaults as a function.
    // http://backbonejs.org/#Model-defaults

    //defaults: function(){
    //    return {
    //        playlistname: "",
    //        tracks: []
    //    };
	//
    //    return this;
    //},

    initialize: function(){

        this.set("playlistname", "");
        this.set("tracks", []);
    },

    addTrack: function(track){
        var tracks = this.get("tracks");
        tracks.push(track);
        this.set('tracks',tracks);
    },

    toJSON: function(){
        var json = {
            name: this.get("name"),
            tracks: []
        };

        // convert submodels to json for templates
        for(var i = 0; i < this.get('tracks').length; i++){
            var t = this.get('tracks')[i];
            json.tracks.push(t.toJSON());
        }
        
        return json;
    }




});