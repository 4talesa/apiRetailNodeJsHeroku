module.exports = function(router){
	
	var grantAuth = require('../models/grantAuth');

	router.get('/Authorize', grantAuth.get);
	
}