module.exports = function(router){

	var productCategory = require('../models/productCategory');

	router.get('/ProductCategory', productCategory.getAll);

	router.put('/ProductCategory/', productCategory.put);

	router.post('/ProductCategory', productCategory.post);

	router.get('/ProductCategory/:id', productCategory.getOne);

	router.delete('/ProductCategory/:id', productCategory.delete);
	
}