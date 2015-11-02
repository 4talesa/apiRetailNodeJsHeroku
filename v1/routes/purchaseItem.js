var app = require('../../server');

var index = require('./index');

var purchaseItem = require('../models/purchaseItem');

app.get(index.version+'/PurchaseItem', purchaseItem.getAll);

app.put(index.version+'/PurchaseItem/', purchaseItem.put);

app.post(index.version+'/PurchaseItem', purchaseItem.post);

app.get(index.version+'/PurchaseItem/:id', purchaseItem.getOne);

app.delete(index.version+'/PurchaseItem/:id', purchaseItem.delete);