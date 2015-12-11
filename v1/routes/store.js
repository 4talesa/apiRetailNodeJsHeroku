module.exports = function(router){
	
	var store = require('../models/store');

	router.get('/Store', store.getAll);

	router.put('/Store/', store.put);

	router.post('/Store', store.post);

	router.get('/Store/:id', store.getOne);

	router.delete('/Store/:id', store.delete);
	
	router.get('/Store/PostalCode/:id', store.getByPostalCode);
	
}