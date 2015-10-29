var app = require('../server');

var paymentMethod = require('../models/paymentMethod');

app.get('/PaymentMethod', paymentMethod.list);

app.put('/PaymentMethod/', paymentMethod.put);

app.post('/PaymentMethod', paymentMethod.post);

app.get('/PaymentMethod/:id', paymentMethod.get);

app.delete('/PaymentMethod/:id', paymentMethod.delete);