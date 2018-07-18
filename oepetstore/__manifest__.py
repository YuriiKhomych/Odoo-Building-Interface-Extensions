{
    'name' : 'Odoo 11 Pet Store',
    'version': '11.0',
    'summary': 'Sell pet toys',
    'category': 'Tools',
    'description':
        """
Odoo Pet Store
=================

A wonderful application to sell pet toys.
        """,
    'data': [
        "petstore.xml",
        "petstore_data.xml",
        "oepetstore.message_of_the_day.csv",
    ],
    'depends' : ['sale_stock'],
    'qweb': ['static/src/xml/*.xml'],
    'application': True,
}
