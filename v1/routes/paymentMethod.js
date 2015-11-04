module.exports = function(router){

	var paymentMethod = require('../models/paymentMethod');

	router.get('/PaymentMethod', paymentMethod.getAll);

	router.put('/PaymentMethod/', paymentMethod.put);

	router.post('/PaymentMethod', paymentMethod.post);

	router.get('/PaymentMethod/:id', paymentMethod.getOne);

	router.delete('/PaymentMethod/:id', paymentMethod.delete);
	
}