var MainViewController = Backbone.View.extend({
    tagName: "section",
    className: "js-main-vc",

    initialize: function(){
        console.log("--- hello world ---");
        _.bindAll(this);
        this.header = new HeaderView();
        this.addChild(this.header);

        if(!UserService.getInstance().isLoggedIn){
            this.showLoginForm();
        }else{
            this.startApp();
        }

        this.bind();
        this.render();
    },

    bind: function(){
        bean.on(UserService.getInstance(), "LOGOUT_SUCCESS", this.showLoginForm);
        bean.on(UserService.getInstance(), "LOGIN_SUCCESS", this.startApp);
    },
    
    showTrackDetail: function(){
        this.trackDetail = new TrackDetailView();
        this.header.setBackground();
        this.addChild(this.trackDetail);
    },

    showLoginForm: function(){
        this.loginForm = new LoginView();
        bean.on(this.loginForm, "LOGIN_CLICKED", UserService.getInstance().login);
        if(this.playlist){
            this.removeChild(this.playlist);
        }
        this.addChild(this.loginForm);
    },

    startApp: function(){
        console.log('startapp');
        this.playlist = new PlaylistView();
        bean.on(this.playlist, "TRACK_CLICKED", this.showTrackDetail);
        if(this.loginForm){
            this.removeChild(this.loginForm);
        }
        this.addChild(this.playlist);

    },

    addChild: function(child, after){
        if(after == undefined){
            this.$el.append(child.el);
        }else{
            this.$el.find(after).after(child.el);
        }
    },

    removeChild: function(child){
        child.$el.remove();
    },

    render: function() {
        $('main').html(this.el);
    }

});
_.extend(MainViewController, Backbone.Singleton);