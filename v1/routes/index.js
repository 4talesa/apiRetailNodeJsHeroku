var app = require('../../server');
var fs = require("fs");

var version = '/v1';
exports.version = version;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get(version+'/docs', function(req, res, next) {

	var data = [];
	
	data = {'Error': 'Swagger not configured', 'Message': 'Please configure the swagger here'};
	
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify(data));
	res.end();
});

app.get(version+'/swagger.json', function(req, res, next) {

	var file = __dirname + '/../../' + version + '/doc/swagger.json';

	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}

		data = JSON.parse(data);

		console.dir(data);
		
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify(data));
		res.end();
	});
});

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