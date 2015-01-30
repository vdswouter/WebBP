
var UserRepository = Backbone.Class.extend({

    initialize: function(context){
        this.context = context;
    },

    getUserWithUserNameAndPassword: function(username, password, callback){
        this.context.getJSONfake("/users/"+username+"/"+password, function(json){

            // convert
            var usr = new User({
                id: json.id,
                name: json.firstname,
                lastname: json.lastname,
                email: json.email
            });

            return callback(usr, json.ERROR);
            
        });
    },

    getUserFromCookie: function(){
        return new User().set(JSON.parse($.cookie('loggedinUser')));
    }

});
_.extend(UserRepository, Backbone.Singleton);


