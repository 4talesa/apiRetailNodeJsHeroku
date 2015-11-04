module.exports = function(router){

	var product = require('../models/product');

	router.get('/Product', product.getAll);

	router.put('/Product/', product.put);

	router.post('/Product', product.post);

	router.get('/Product/:id', product.getOne);

	router.delete('/Product/:id', product.delete);
	
}