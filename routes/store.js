var app = require('../server');

var store = require('../models/store');

app.get('/Store', store.list);

app.put('/Store/', store.put);

app.post('/Store', store.post);

app.get('/Store/:id', store.get);

app.delete('/Store/:id', store.delete);