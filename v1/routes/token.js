module.exports = function(router){
	
	var token = require('../models/token');

	router.get('/Token', token.get);
	
}