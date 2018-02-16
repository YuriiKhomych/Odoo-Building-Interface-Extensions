odoo.define('oepetstore.petstore', function (require) {
    "use strict";
    var Class = require('web.Class');
    var Widget = require('web.Widget');
    var core = require('web.core');
    var utils = require('web.utils');
    var Model = require('web.Model');
    var data = require('web.data');
    var QWeb = core.qweb;
    var _t = core._t;
    var _lt = core._lt;


    var homePage = Widget.extend({
        start: function() {
        var self = this;
        var model = new Model("oepetstore.message_of_the_day");
        model.call("my_method", {context: new data.CompoundContext()}).then(function(result) {
            self.$el.append("<div>Hello " + result["hello"] + "</div>");
            // will show "Hello world" to the user
        });
    },
});

core.action_registry.add('petstore.homepage', homePage);

});