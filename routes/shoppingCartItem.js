var app = require('../server');

var shoppingCartItem = require('../models/shoppingCartItem');

app.get('/ShoppingCartItem', shoppingCartItem.list);

app.put('/ShoppingCartItem/', shoppingCartItem.put);

app.post('/ShoppingCartItem', shoppingCartItem.post);

app.get('/ShoppingCartItem/:id', shoppingCartItem.get);

app.delete('/ShoppingCartItem/:id', shoppingCartItem.delete);