var app = require('../server');

var productCategory = require('../models/productCategory');

app.get('/ProductCategory', productCategory.list);

app.put('/ProductCategory/', productCategory.put);

app.post('/ProductCategory', productCategory.post);

app.get('/ProductCategory/:id', productCategory.get);

app.delete('/ProductCategory/:id', productCategory.delete);