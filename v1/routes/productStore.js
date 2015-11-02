var app = require('../../server');

var index = require('./index');

var productStore = require('../models/productStore');

app.get(index.version+'/ProductStore', productStore.getAll);

app.put(index.version+'/ProductStore/', productStore.put);

app.post(index.version+'/ProductStore', productStore.post);

app.get(index.version+'/ProductStore/:id', productStore.getOne);

app.delete(index.version+'/ProductStore/:id', productStore.delete);