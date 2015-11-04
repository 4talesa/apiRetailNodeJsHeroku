module.exports = function(router){
	
	var user = require('../models/user');

	router.get('/User', user.getAll);

	router.put('/User/', user.put);

	router.post('/User', user.post);

	router.get('/User/:id', user.getOne);

	router.delete('/User/:id', user.delete);
	
}