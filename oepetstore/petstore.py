from odoo import api, fields, models

class MessageOfTheDay(models.Model):
    _name = "oepetstore.message_of_the_day"

    @api.model
    def my_method(self):
        return {"hello": "world"}

    message = fields.Text()
    color = fields.Char(size=20)


class Product(models.Model):
    _inherit = "product.product"

    max_quantity = fields.Float(string="Maximum Quantity")
    provider_latitude = fields.Text(string="Latitude")
    provider_longitude = fields.Text(string="Longitude")