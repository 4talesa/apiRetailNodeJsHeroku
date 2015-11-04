var app = require('../../server');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  console.log('api_key:'+req.query.api_key);
  if (req.query.api_key=='123456789'){
	  next();
  }else{
	  res.sendStatus(401);
  }
});

module.exports = function(router){
	router.get('/testAPI', function(req, res, next){
		res.json({SecretData: 'abc123'});
	});
	
	var docs = require('./doc');

	// Routes to models
	var user = require('./user')(router);
	var store = require('./store')(router);	
	var product = require('./product')(router);
	var productStore = require('./productStore')(router);	
	var category = require('./category')(router);
	var productCategory = require('./productCategory')(router);	
	var purchase = require('./purchase')(router);
	var purchaseItem = require('./purchaseItem')(router);
	var paymentMethod = require('./paymentMethod')(router);	
	var shoppingCart = require('./shoppingCart')(router);
	var shoppingCartItem = require('./shoppingCartItem')(router);
	// Milestone 2
	//var shoppingCartShippingSchedule = require('./shoppingCartShippingSchedule')(router);
	//var shoppingCartShippingMethod = require('./shoppingCartShippingMethod')(router);
	//var friend = require('./friend')(router);
	//var achievement = require('./achievement')(router);
	//var achievementType = require('./achievementType')(router);
	//var review = require('./review')(router);
	//var beaconStore = require('./beaconStore')(router);
	//var productScanning = require('./productScanning')(router);
	//var visit = require('./visit')(router);
}
