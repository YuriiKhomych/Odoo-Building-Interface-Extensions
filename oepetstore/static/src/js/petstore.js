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
        template: "HomePageTemplate",
        className: 'oe_petstore_homepage',
        init: function(parent) {
            this._super(parent);
            this.name = "Mordecai";
            console.log("Hello JS, I'm inside of init.");
        },
        start: function() {
            console.log("Your pet store home page loaded");
            this.$el.append("<div>Hello dear Odoo user!</div>");
            var greeting = new GreetingsWidget(this);
            greeting.appendTo(this.$el);
            console.log(this.getChildren()[0].$el);
            // will print "div.oe_petstore_greetings" in the console
            // this.$el.append(QWeb.render("HomePageTemplate", {name: "Klaus"}));
            return greeting.appendTo(this.$el);
        },
    });
    core.action_registry.add('petstore.homepage', homePage);

    var GreetingsWidget = Widget.extend({
        className: 'oe_petstore_greetings',
        init: function(parent, name) {
            this._super(parent);
            this.name = name;
        },
        start: function() {
            this.$el.append("<div>We are so happy to see you again in this menu!</div>");
            console.log(this.getParent().$el );
            // will print "div.oe_petstore_homepage" in the console
        },
    });

});