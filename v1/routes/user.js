var app = require('../../server');

var index = require('./index');

var user = require('../models/user');

app.get(index.version+'/User', user.getAll);

app.put(index.version+'/User/', user.put);

app.post(index.version+'/User', user.post);

app.get(index.version+'/User/:id', user.getOne);

app.delete(index.version+'/User/:id', user.delete);