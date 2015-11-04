module.exports = function(router){

	var category = require('../models/category');

	router.get('/Category', category.getAll);

	router.put('/Category/', category.put);

	router.post('/Category', category.post);

	router.get('/Category/:id', category.getOne);

	router.delete('/Category/:id', category.delete);
	
}