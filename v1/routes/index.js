var app = require('../../server');

var version = '/v1';
exports.version = version;

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

var docs = require('./doc');

// Routes to models
var user = require('./user');
var store = require('./store');
//var beaconStore = require('./beaconStore');
var product = require('./product');
var productStore = require('./productStore');
//var productScanning = require('./productScanning');
var category = require('./category');
var productCategory = require('./productCategory');
//var visit = require('./visit');
var purchase = require('./purchase');
var purchaseItem = require('./purchaseItem');
var paymentMethod = require('./paymentMethod');
//var review = require('./review');
var shoppingCart = require('./shoppingCart');
var shoppingCartItem = require('./shoppingCartItem');
//var shoppingCartShippingSchedule = require('./shoppingCartShippingSchedule');
//var shoppingCartShippingMethod = require('./shoppingCartShippingMethod');
//var friend = require('./friend');
//var achievement = require('./achievement');
//var achievementType = require('./achievementType');