odoo.define('oepetstore.petstore', function (require) {
    "use strict";
    var Class = require('web.Class');
    var Widget = require('web.Widget');
    var core = require('web.core');
    var utils = require('web.utils');
    var Model = require('web.Model');
    var data = require('web.data');
    var form_common = require('web.form_common');
    var QWeb = core.qweb;
    var AbstractField = form_common.AbstractField;
    var _t = core._t;
    var _lt = core._lt;


    var homePage = Widget.extend({
        template: "HomePage",
        start: function() {
            return $.when(
                new PetToysList(this).appendTo(this.$('.oe_petstore_homepage_left')),
                new MessageOfTheDay(this).appendTo(this.$('.oe_petstore_homepage_right'))
            );
        }
    });

    // instead instance.web.client_actions.add('petstore.homepage', 'instance.oepetstore.HomePage');
    core.action_registry.add('petstore.homepage', homePage);

    var MessageOfTheDay = Widget.extend({
        template: "MessageOfTheDay",
        start: function() {
            var self = this;
            return new Model("oepetstore.message_of_the_day")
                .query(["message"])
                .order_by('-create_date', '-id')
                .first()
                .then(function(result) {
                    self.$(".oe_mywidget_message_of_the_day").text(result.message);
                });
        },
    });
    var PetToysList = Widget.extend({
        template: 'PetToysList',
        events: {
            'click .oe_petstore_pettoy': 'selected_item',
        },
        start: function () {
            var self = this;
            return new Model('product.product')
                .query(['name', 'image'])
                .filter([['categ_id.name', '=', "Pet Toys"]])
                .limit(5)
                .all()
                .then(function (results) {
                    _(results).each(function (item) {
                        self.$el.append(QWeb.render('PetToy', {item: item}));
                    });
                });
        },
        selected_item: function (event) {
            this.do_action({
                type: 'ir.actions.act_window',
                res_model: 'product.product',
                res_id: $(event.currentTarget).data('id'),
                views: [[false, 'form']],
            });
        },
    });

    var FieldColor = form_common.AbstractField.extend({
        events: {
            'change input': function(e) {
                if (!this.get('effective_readonly')){
                    this.internal_set_value($(e.currentTarget).val());
                }
            }
        },
        init: function() {
            this._super.apply(this, arguments);
            this.set('value','');
        },
        start: function(){
            this.on('change:effective_readonly', this, function() {
                this.display_field();
                this.render_value();
            });
            this.display_field();
            return this._super();
        },
        display_field: function(){
            this.$el.html(QWeb.render('FieldColor', {widget: this}));
        },
        render_value: function(){
            if (this.get('effective_readonly')) {
                this.$(".oe_field_color_content").css("background-color", this.get("value") || "#FFFFFF");
            } else {
                this.$('input').val(this.get('value') || '#FFFFFF');
            }
        }
    });

    core.form_widget_registry.add('color', FieldColor);
});