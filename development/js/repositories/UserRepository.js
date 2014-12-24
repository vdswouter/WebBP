
var UserRepository = Backbone.Class.extend({

    initialize: function(context){
        this.context = context;
    },

    getUserWithUserNameAndPassword: function(username, password, callback){
        this.context.getJSONfake("/users/"+username+"/"+password, function(json){

            var usr = new User({
                id: json.id,
                name: json.firstname,
                lastname: json.lastname,
                email: json.email
            });

            return callback(usr, json.ERROR);
            
        });
    }

});
_.extend(UserRepository, Backbone.Singleton);


