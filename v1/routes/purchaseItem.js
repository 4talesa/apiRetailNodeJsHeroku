module.exports = function(router){

	var purchaseItem = require('../models/purchaseItem');

	router.get('/PurchaseItem', purchaseItem.getAll);

	router.put('/PurchaseItem/', purchaseItem.put);

	router.post('/PurchaseItem', purchaseItem.post);

	router.get('/PurchaseItem/:id', purchaseItem.getOne);

	router.delete('/PurchaseItem/:id', purchaseItem.delete);
	
}