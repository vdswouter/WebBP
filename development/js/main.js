//INITIAL SETUP OF LIBS
$.cookie.raw = true;


//var Router = Backbone.Router.extend({
//    routes: {
//        'logout':'logoutRoute',
//        '': 'loginRoute',
//        'login':'loginRoute'
//    },
//
//    loginRoute: function(){
//        MainViewController.getInstance();
//    },
//
//    logoutRoute: function(){
//        console.log("logout");
//        UserService.getInstance().logout();
//    }
//});
//_.extend(Router, Backbone.Singleton);

//Router.getInstance().navigate('');

//Initialize the app. This is the main entrypoint.
MainViewController.getInstance();

Backbone.history.start();

