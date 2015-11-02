var app = require('../../server');

var index = require('./index');

var product = require('../models/product');

app.get(index.version+'/Product', product.list);

app.put(index.version+'/Product/', product.put);

app.post(index.version+'/Product', product.post);

app.get(index.version+'/Product/:id', product.get);

app.delete(index.version+'/Product/:id', product.delete);