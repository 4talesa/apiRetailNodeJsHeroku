var app = require('../../server');

var index = require('./index');

var store = require('../models/store');

app.get(index.version+'/Store', store.getAll);

app.put(index.version+'/Store/', store.put);

app.post(index.version+'/Store', store.post);

app.get(index.version+'/Store/:id', store.getOne);

app.delete(index.version+'/Store/:id', store.delete);