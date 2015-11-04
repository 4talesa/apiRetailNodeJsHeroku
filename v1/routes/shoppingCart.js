module.exports = function(router){

	var shoppingCart = require('../models/shoppingCart');

	router.get('/ShoppingCart', shoppingCart.getAll);

	router.put('/ShoppingCart/', shoppingCart.put);

	router.post('/ShoppingCart', shoppingCart.post);

	router.get('/ShoppingCart/:id', shoppingCart.getOne);

	router.delete('/ShoppingCart/:id', shoppingCart.delete);
	
}