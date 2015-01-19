/**
 * Created by wouter on 22/12/14.
 */
var LoginViewController = Backbone.View.extend({
    tagName: "section",
    id: "login-form",
    template: tpl.login,


    initialize: function () {
        _.bindAll(this);

        this.addEventListeners();
        this.render();
    },

    events: {
        "click .js-btn-login": "loginClicked"
    },

    addEventListeners: function () {
        bean.on(UserService.getInstance(), "LOGIN_FAILED", this.showError);
        bean.on(UserService.getInstance(), "LOGIN_SUCCESS", this.removeFromParrent);
    },

    render: function () {
        this.$el.html(this.template());
    },

    removeFromParrent: function () {
        this.$el.remove();
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

        UserService.getInstance().login()
    }
});