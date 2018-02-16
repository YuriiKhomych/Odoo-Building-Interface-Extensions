odoo.define('oepetstore.petstore', function (require) {
    "use strict";
    var Class = require('web.Class');
    var Widget = require('web.Widget');
    var core = require('web.core');
    var utils = require('web.utils');
    var QWeb = core.qweb;
    var _t = core._t;
    var _lt = core._lt;

    var homePage = Widget.extend({
        start: function() {
            var products = new ProductsWidget(
                this, ["cpu", "mouse", "keyboard", "graphic card", "screen"], "#00FF00");
            products.appendTo(this.$el);
            var widget = new ConfirmWidget(this);
            widget.on("user_chose", this, this.user_chose);
            widget.appendTo(this.$el);
        },
        user_chose: function(confirm) {
            if (confirm) {
                console.log("The user agreed to continue");
            } else {
                console.log("The user refused to continue");
            }
        },
});

var ProductsWidget = Widget.extend({
    template: "ProductsWidget",
    init: function(parent, products, color) {
        this._super(parent);
        this.products = products;
        this.color = color;
    },
});

var ConfirmWidget = Widget.extend({
    events: {
        'click button.ok_button': function () {
            this.trigger('user_chose', true);
        },
        'click button.cancel_button': function () {
            this.trigger('user_chose', false);
        }
    },
    start: function() {
        this.$el.append("<div>Are you sure you want to perform this action?</div>" +
            "<button class='ok_button'>Ok</button>" +
            "<button class='cancel_button'>Cancel</button>");
    },
});
core.action_registry.add('petstore.homepage', homePage);

});