var app = require('../../server');

var index = require('./index');

var purchase = require('../models/purchase');

app.get(index.version+'/Purchase', purchase.getAll);

app.put(index.version+'/Purchase/', purchase.put);

app.post(index.version+'/Purchase', purchase.post);

app.get(index.version+'/Purchase/:id', purchase.getOne);

app.delete(index.version+'/Purchase/:id', purchase.delete);