var app = require('../../server');

var pg = require('pg');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();  
});

module.exports = function(router){
	
	// Configure Passport
	var passport = require('passport');
	require('../config/passport')(passport);
	
	// Initialize Passport
	router.use(passport.initialize());
	router.use(passport.session()); // persistent login sessions
	
	var token = require('./token')(router);
	var grantAuth = require('./grantAuth')(router);
	var docs = require('./doc')(router);

	//router.use(passport.authenticate('bearer', { session: false }));	

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
	var reward = require('./reward')(router);
	var reward = require('./beaconStore')(router);
	//var shoppingCartShippingSchedule = require('./shoppingCartShippingSchedule')(router);
	//var shoppingCartShippingMethod = require('./shoppingCartShippingMethod')(router);
	//var friend = require('./friend')(router);
	//var achievement = require('./achievement')(router);
	//var achievementType = require('./achievementType')(router);
	//var review = require('./review')(router);
	//var productScanning = require('./productScanning')(router);
	//var visit = require('./visit')(router);
}
