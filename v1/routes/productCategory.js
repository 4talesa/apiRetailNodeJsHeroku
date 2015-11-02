var app = require('../../server');

var index = require('./index');

var productCategory = require('../models/productCategory');

app.get(index.version+'/ProductCategory', productCategory.getAll);

app.put(index.version+'/ProductCategory/', productCategory.put);

app.post(index.version+'/ProductCategory', productCategory.post);

app.get(index.version+'/ProductCategory/:id', productCategory.getOne);

app.delete(index.version+'/ProductCategory/:id', productCategory.delete);