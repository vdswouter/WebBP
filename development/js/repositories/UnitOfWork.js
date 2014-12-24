
var UnitOfWork = Backbone.Class.extend({

    initialize: function(){

        this.context = new JSONContext();

        this.userRepository = new UserRepository(this.context);
        this.playlistRepository = new PlaylistRepository(this.context);

    }

    
});
_.extend(UnitOfWork, Backbone.Singleton);


