var app = require('../../server');

var index = require('./index');

var store = require('../models/store');

app.get(index.version+'/Store', store.list);

app.put(index.version+'/Store/', store.put);

app.post(index.version+'/Store', store.post);

app.get(index.version+'/Store/:id', store.get);

app.delete(index.version+'/Store/:id', store.delete);