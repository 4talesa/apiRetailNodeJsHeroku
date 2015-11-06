module.exports = function(router){

	var doc = require('../models/doc');
	
	router.get('/Docs', doc.getDocs);

	router.get('/swagger.json', doc.getSwaggerJSON);
}