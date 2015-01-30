/**
 * Created by wouter on 22/12/14.
 */
var LoginViewController = Backbone.View.extend({
    tagName: "section",
    id: "login-form",
    template: tpl.login,


    initialize: function () {
        _.bindAll(this);

        this.userService = UserService.getInstance();

        this.addEventListeners();
        this.render();
    },

    events: {
        "click .js-btn-login": "loginClicked"
    },

    addEventListeners: function () {
        bean.on(this.userService, "LOGIN_FAILED", this.showError);
    },

    render: function () {
        this.$el.html(this.template());
    },

    reset: function () {
        console.log('reset');
        //reset tot default values
        this.$el.find(".js-btn-login").fadeTo(10, 1);
        this.$el.find(".alert").remove();

        this.$el.find('input[name=login-username]').val('');
        this.$el.find('input[name=login-password]').val('');

    },

    showError: function (data) {

        this.$el.prepend("<div class='alert error'>" + data.error + "</div>");
        this.$el.find(".js-btn-login").fadeTo(330, 1);

    },

    loginClicked: function (e) {
        e.preventDefault();

        this.$el.find(".js-btn-login").fadeTo(330, 0.2);
        this.$el.find(".alert").remove();

        var user = this.$el.find('input[name=login-username]').val();
        var pass = this.$el.find('input[name=login-password]').val();

        this.userService.login(user, pass);
    }
});