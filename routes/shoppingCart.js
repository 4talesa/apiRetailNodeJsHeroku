var app = require('../server');

var shoppingCart = require('../models/shoppingCart');

app.get('/ShoppingCart', shoppingCart.list);

app.put('/ShoppingCart/', shoppingCart.put);

app.post('/ShoppingCart', shoppingCart.post);

app.get('/ShoppingCart/:id', shoppingCart.get);

app.delete('/ShoppingCart/:id', shoppingCart.delete);