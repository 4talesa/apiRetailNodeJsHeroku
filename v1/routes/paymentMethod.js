var app = require('../../server');

var index = require('./index');

var paymentMethod = require('../models/paymentMethod');

app.get(index.version+'/PaymentMethod', paymentMethod.list);

app.put(index.version+'/PaymentMethod/', paymentMethod.put);

app.post(index.version+'/PaymentMethod', paymentMethod.post);

app.get(index.version+'/PaymentMethod/:id', paymentMethod.get);

app.delete(index.version+'/PaymentMethod/:id', paymentMethod.delete);