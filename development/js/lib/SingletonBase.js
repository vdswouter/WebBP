/**
 * Created by wouter on 22/12/14.
 */
Backbone.Singleton = {
    getInstance: function () {
        if (this._instance === undefined) {
            this._instance = new this();
        }
        return this._instance;
    }
}