/**
 * Created by wouter on 22/12/14.
 */
var HeaderViewController = Backbone.View.extend({
    tagName: "div",
    className: "has-overlay",
    template: tpl.header,

    initialize: function () {
        // Constructor
        _.bindAll(this);
        this.setBackground("img/image.jpg");

        this.addEventListeners();
        this.render();
    },

    events: {
        'click .logout': "logoutClicked"
    },

    addEventListeners: function () {
        // could be replaced by Routing
        bean.on(UserService.getInstance(), "LOGIN_SUCCESS LOGOUT_SUCCESS", this.render);
    },

    render: function () {
        this.$el.html(this.template({loggedin: UserService.getInstance().isLoggedIn}));

        // TODO: Move this out of the render function
        if (UserService.getInstance().isLoggedIn) {
            this.setUser();
        } else {
            this.setInfo("Try to login with 'test' - 'test'. It always works.");
        }
    },

    logoutClicked: function () {
        UserService.getInstance().logout();
    },

    setUser: function () {
        // Requires no params as persistent data is stored in the service.
        var username = UserService.getInstance().loggedinUser.get('name');
        this.$el.find('.name').html(username);
    },

    setInfo: function (info) {
        // updates the textual message in the header
        this.$el.find("p.info").html(info);
    },

    setBackground: function (url) {
        // parameter is not required, as we will take the image from te service.
        if (url == null) {
            url = PlaylistService.getInstance().selectedTrack.get('image');
        }

        this.$el.css("background-image", "url(" + url + ")");
    }
});