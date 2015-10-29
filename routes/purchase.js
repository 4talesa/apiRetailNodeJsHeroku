var app = require('../server');

var purchase = require('../models/purchase');

app.get('/Purchase', purchase.list);

app.put('/Purchase/', purchase.put);

app.post('/Purchase', purchase.post);

app.get('/Purchase/:id', purchase.get);

app.delete('/Purchase/:id', purchase.delete);