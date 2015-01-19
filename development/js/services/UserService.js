/**
 * Created by wouter on 23/12/14.
 */
var UserService = Backbone.Class.extend({

    initialize: function(){
        _.bindAll(this);

        this.isLoggedIn = $.cookie('loggedIn');

        this.loggedinUser = null;
        if(this.isLoggedIn){
            this.loggedinUser = new User().set(JSON.parse($.cookie('loggedinUser')));
        }

    },

    login: function(username, password){

        if(this.loggedinUser != null){
            bean.fire(this, "LOGIN_SUCCESS");
            return;
        }

        var self = this;
        UnitOfWork.getInstance().userRepository.getUserWithUserNameAndPassword(username, password, function(user, error){
            if(error == null){
                self.loggedinUser = user;
                self.isLoggedIn = true;
                $.cookie('loggedinUser',JSON.stringify(user.toJSON()));
                $.cookie("loggedIn", 1);
                bean.fire(self, "LOGIN_SUCCESS");

            }else{

                bean.fire(self, "LOGIN_FAILED", {error: error});

            }
        });
    },

    logout: function(){
        this.isLoggedIn = false;
        this.loggedinUser = null;
        $.removeCookie("loggedIn");
        $.removeCookie("loggedinUser");
        bean.fire(this, "LOGOUT_SUCCESS");
    }



});
_.extend(UserService, Backbone.Singleton);