var app = require('../server');

var product = require('../models/product');

app.get('/Product', product.list);

app.put('/Product/', product.put);

app.post('/Product', product.post);

app.get('/Product/:id', product.get);

app.delete('/Product/:id', product.delete);