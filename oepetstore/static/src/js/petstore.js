odoo.define('oepetstore.petstore', function (require) {
    "use strict";
    var Class = require('web.Class');
    var Widget = require('web.Widget');
    var core = require('web.core');
    var utils = require('web.utils');
    var QWeb = core.qweb;
    var _t = core._t;
    var _lt = core._lt;


    var ColorInputWidget = Widget.extend({
        template: "ColorInputWidget",
        events: {
            'change input': 'input_changed'
        },
        start: function() {
            this.input_changed();
            return this._super();
        },
        input_changed: function() {
            var color = [
                "#",
                this.$(".oe_color_red").val(),
                this.$(".oe_color_green").val(),
                this.$(".oe_color_blue").val()
            ].join('');
            this.set("color", color);
        },
    });

    var homePage = Widget.extend({
        template: "HomePage",
        start: function() {
            this.colorInput = new ColorInputWidget(this);
            this.colorInput.on("change:color", this, this.color_changed);
            return this.colorInput.appendTo(this.$el);
        },
        color_changed: function() {
            this.$(".oe_color_div").css("background-color", this.colorInput.get("color"));
        },
});

core.action_registry.add('petstore.homepage', homePage);

});