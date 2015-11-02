var app = require('../../server');

var index = require('./index');

var productStore = require('../models/productStore');

app.get(index.version+'/ProductStore', productStore.list);

app.put(index.version+'/ProductStore/', productStore.put);

app.post(index.version+'/ProductStore', productStore.post);

app.get(index.version+'/ProductStore/:id', productStore.get);

app.delete(index.version+'/ProductStore/:id', productStore.delete);