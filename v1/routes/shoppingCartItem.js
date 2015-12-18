module.exports = function(router){

	var shoppingCartItem = require('../models/shoppingCartItem');

	router.get('/ShoppingCartItem', shoppingCartItem.getAll);

	router.put('/ShoppingCartItem/', shoppingCartItem.put);

	router.post('/ShoppingCartItem', shoppingCartItem.post);

	router.get('/ShoppingCartItem/:id', shoppingCartItem.getOne);

	router.delete('/ShoppingCartItem/:id', shoppingCartItem.deleteOne);
	
	router.get('/ShoppingCartItem/ShoppingCart/:id', shoppingCartItem.getByShoppingCart);
	
}