var app = require('../../server');

var index = require('./index');

var shoppingCartItem = require('../models/shoppingCartItem');

app.get(index.version+'/ShoppingCartItem', shoppingCartItem.list);

app.put(index.version+'/ShoppingCartItem/', shoppingCartItem.put);

app.post(index.version+'/ShoppingCartItem', shoppingCartItem.post);

app.get(index.version+'/ShoppingCartItem/:id', shoppingCartItem.get);

app.delete(index.version+'/ShoppingCartItem/:id', shoppingCartItem.delete);