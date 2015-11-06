module.exports = function(router){
	
	var token = require('../models/token');

	router.get('/getToken/:id', token.getByUser);	
	
}