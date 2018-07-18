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
    core.action_registry.add('petstore.homepage', homePage);

});