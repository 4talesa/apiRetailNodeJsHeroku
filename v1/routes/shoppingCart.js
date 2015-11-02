var app = require('../../server');

var index = require('./index');

var shoppingCart = require('../models/shoppingCart');

app.get(index.version+'/ShoppingCart', shoppingCart.list);

app.put(index.version+'/ShoppingCart/', shoppingCart.put);

app.post(index.version+'/ShoppingCart', shoppingCart.post);

app.get(index.version+'/ShoppingCart/:id', shoppingCart.get);

app.delete(index.version+'/ShoppingCart/:id', shoppingCart.delete);