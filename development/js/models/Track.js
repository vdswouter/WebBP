/**
 * Created by wouter on 24/12/14.
 */
var Track = Backbone.Model.extend({
    defaults: {
        title: "No Trackname Available",
        artist: "Artist unknown",
        label: "no-label",
        image: "placeholder.jpg",
        playlist: "",
        artist_id: "",
        status: ""
    }
});