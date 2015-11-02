var app = require('../../server');

var index = require('./index');

var productCategory = require('../models/productCategory');

app.get(index.version+'/ProductCategory', productCategory.list);

app.put(index.version+'/ProductCategory/', productCategory.put);

app.post(index.version+'/ProductCategory', productCategory.post);

app.get(index.version+'/ProductCategory/:id', productCategory.get);

app.delete(index.version+'/ProductCategory/:id', productCategory.delete);