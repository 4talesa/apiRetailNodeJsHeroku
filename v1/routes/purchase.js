module.exports = function(router){

	var purchase = require('../models/purchase');

	router.get('/Purchase', purchase.getAll);

	router.put('/Purchase/', purchase.put);

	router.post('/Purchase', purchase.post);

	router.get('/Purchase/:id', purchase.getOne);

	router.delete('/Purchase/:id', purchase.delete);
	
	router.get('/Purchase/User/:id', purchase.getByUser);
	
}