/**
 * Created by wouter on 23/12/14.
 */
var JSONContext = Backbone.Class.extend({

    rootURL: "http://www.bbc.co.uk/radio1/",

    initialize: function(){

        //THIS IS A FAKE CLASS THAT NORMALLY SHOULD DO THE CONNECTION WITH THE DATABASE
        //TODO: Database connection, bindvalues, query generation
    },

    getJSON: function(query, callback){
        $.ajax({
            headers: { "Accept": "application/json"},
            url: this.rootURL + query + "?callback=?",
            method: "GET",
            crossDomain: true,
            beforeSend: function(xhr){
                xhr.withCredentials = true;
            },
            success: function(data){
                return callback(data);
            }
        })
    },

    getJSONfake: function(query, callback){

        var returnvalue = {
            id: 123456,
            firstname:  "Wouter",
            lastname:   "vandersyppe",
            email:      "wouter@littlemissrobot.com"
        };
        
        if(query != "/users/test/test"){
            returnvalue.ERROR = "foute username of password";
        }
        callback(returnvalue);
    }




});
_.extend(JSONContext, Backbone.Singleton);
