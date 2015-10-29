var app = require('../server');

var productStore = require('../models/productStore');

app.get('/ProductStore', productStore.list);

app.put('/ProductStore/', productStore.put);

app.post('/ProductStore', productStore.post);

app.get('/ProductStore/:id', productStore.get);

app.delete('/ProductStore/:id', productStore.delete);