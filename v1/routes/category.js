var app = require('../../server');

var index = require('./index');

var category = require('../models/category');

app.get(index.version+'/Category', category.list);

app.put(index.version+'/Category/', category.put);

app.post(index.version+'/Category', category.post);

app.get(index.version+'/Category/:id', category.get);

app.delete(index.version+'/Category/:id', category.delete);