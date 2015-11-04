module.exports = function(router){

	var productStore = require('../models/productStore');

	router.get('/ProductStore', productStore.getAll);

	router.put('/ProductStore/', productStore.put);

	router.post('/ProductStore', productStore.post);

	router.get('/ProductStore/:id', productStore.getOne);

	router.delete('/ProductStore/:id', productStore.delete);
	
}