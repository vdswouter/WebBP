var MainViewController = Backbone.View.extend({
    // View Backbone referenceguide to see which functions and vars
    // are Backbone syntax
    // http://backbonejs.org/
    tagName: "section",
    className: "js-main-vc",

    initialize: function () {
        // Constructor

        // bindAll enables us to use the 'this' keyword in encapsulated functions
        _.bindAll(this);

        // Load the Header + put it on the screen.
        this.header = new HeaderViewController();
        this.addChild(this.header);

        // Check if user is logged in and decide if we show the loginform
        // or go directly to the app.
        if (!UserService.getInstance().isLoggedIn) {
            this.showLoginForm();
        } else {
            this.startApp();
        }

        this.addEventListeners();
        this.render();
    },

    addEventListeners: function () {
        // this could be fixed by a router
        bean.on(UserService.getInstance(), "LOGOUT_SUCCESS", this.showLoginForm);
        bean.on(UserService.getInstance(), "LOGIN_SUCCESS", this.startApp);
    },

    showTrackDetail: function () {
        // Loads the popup, The popup itself gets its data from service layers.
        // so no data is send to the class.
        this.trackDetail = new TrackDetailViewController();
        
        // the header loads the images from the service if no data is passed
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
        this.playlist = new PlaylistViewController();

        // could be replaced by routing
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
        // self rendering can be discussed.

        $('main').html(this.el);
    }

});
_.extend(MainViewController, Backbone.Singleton);