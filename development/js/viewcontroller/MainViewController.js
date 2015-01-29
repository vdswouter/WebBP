var MainViewController = Backbone.View.extend({
    tagName: "section",
    className: "js-main-vc",

    initialize: function () {
        console.log("--- hello world ---");
        _.bindAll(this);
        this.header = new HeaderViewController();
        this.addChild(this.header);

        if (!UserService.getInstance().isLoggedIn) {
            this.showLoginForm();
        } else {
            this.startApp();
        }

        this.addEventListeners();
        this.render();
    },

    addEventListeners: function () {
        bean.on(UserService.getInstance(), "LOGOUT_SUCCESS", this.showLoginForm);
        bean.on(UserService.getInstance(), "LOGIN_SUCCESS", this.startApp);
    },

    showTrackDetail: function () {
        this.trackDetail = new TrackDetailViewController();
        this.header.setBackground();
        this.addChild(this.trackDetail);
    },

    showLoginForm: function () {
        this.loginForm = new LoginViewController();
        if (this.playlist) {
            this.removeChild(this.playlist);
        }
        this.header.setBackground("img/image.jpg");
        this.addChild(this.loginForm);
    },

    startApp: function () {
        console.log('startapp');
        this.playlist = new PlaylistViewController();
        bean.on(PlaylistService.getInstance(), "TRACK_SELECTED", this.showTrackDetail);
        if (this.loginForm) {
            this.removeChild(this.loginForm);
        }
        this.addChild(this.playlist);

    },

    addChild: function (child, after) {
        if (after == undefined) {
            this.$el.append(child.el);
        } else {
            this.$el.find(after).after(child.el);
        }
    },

    removeChild: function (child) {
        child.$el.remove();
    },

    render: function () {
        $('main').html(this.el);
    }

});
_.extend(MainViewController, Backbone.Singleton);