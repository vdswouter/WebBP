/**
 * Created by wouter on 22/12/14.
 */
var HeaderView = Backbone.View.extend({
    tagName: "div",
    className: "has-overlay",
    template: tpl.header,

    initialize: function(){
        _.bindAll(this);
        this.setBackground("img/image.jpg");

        this.bind();
        this.render();
    },

    events: {
        'click .logout': "logoutClicked"
    },

    bind: function(){
        bean.on(UserService.getInstance(), "LOGIN_SUCCESS LOGOUT_SUCCESS", this.render);
    },

    render: function(){
        this.$el.html(this.template({loggedin: UserService.getInstance().isLoggedIn}));
        if(UserService.getInstance().isLoggedIn){
            this.setUser();
        }else{
            this.setInfo("Try to login with 'test' - 'test'. It always works.");
        }
    },

    logoutClicked: function(){
        UserService.getInstance().logout();
    },

    setUser: function(){
        var username = UserService.getInstance().loggedinUser.get('name');
        this.$el.find('.name').html(username);
    },

    setInfo: function(info){
        this.$el.find("p.info").html(info);
    },

    setBackground : function(url){
        if(url == null){
            url = PlaylistService.getInstance().selectedTrack.get('image');
        }

        this.$el.css("background-image","url("+url+")");
    }
});