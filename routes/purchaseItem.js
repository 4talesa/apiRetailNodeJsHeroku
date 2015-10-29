var app = require('../server');

var purchaseItem = require('../models/purchaseItem');

app.get('/PurchaseItem', purchaseItem.list);

app.put('/PurchaseItem/', purchaseItem.put);

app.post('/PurchaseItem', purchaseItem.post);

app.get('/PurchaseItem/:id', purchaseItem.get);

app.delete('/PurchaseItem/:id', purchaseItem.delete);