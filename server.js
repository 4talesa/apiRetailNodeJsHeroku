var express = require('express');
var app = express();
var fs = require("fs");
var pg = require('pg');
var assert = require('assert');

var app = module.exports = express();

app.set('port', (process.env.PORT || 5000));

// Suport for body variables
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Suport for swagger
var argv = require('minimist')(process.argv.slice(2));
var swagger = require("swagger-node-express");
var subpath = express();

app.use(bodyParser());
app.use("/doc/v1", subpath);
swagger.setAppHandler(subpath);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  /*pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('insert into api_log (originalUrl, url, body, postDate) values ($1,$2,$3,current_timestamp) RETURNING _id, originalUrl, url,'+JSON.stringify(req.body)+', postDate',
					[req.originalUrl, req.url], function(err, result) {
			done();
			if (err) {				
				console.error('api_log not inserted');
			}else{
				if (result.rows.length>0){					
					console.log(result.rows[0]);
				}else{					
					console.error('api_log not inserted');
				}
			}
		});
	});*/
	
  next();
});

app.get('/', function(req, res, next) {
	var data = [];
	
	data = {'Error': 'Invalid version', 'Message': 'Version v1 is available, try use url + v1 + docs to get info'};
	
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify(data));
	res.end();
});

var apiv1 = express.Router();
require('./v1/routes/index.js')(apiv1);
app.use('/api/v1', apiv1);

swagger.setApiInfo({
    title: "Retail API",
    description: "API to serve the Retail App",
    termsOfServiceUrl: "",
    contact: "rond.borges@totvs.com",
    license: "",
    licenseUrl: ""
});

app.use('/static_dist', express.static(__dirname + '/v1/doc/dist'));

subpath.get('/', function (req, res) {
	console.log('Access Swagger');
	res.sendFile(__dirname + '/v1/doc/dist/index.html');
});

swagger.configureSwaggerPaths('', 'api-docs', '');
var domain = 'localhost:'+(process.env.PORT || 5000);
if(argv.domain !== undefined)
	domain = argv.domain;
else
	console.log('No --domain=xxx specified, taking default hostname "localhost".');
console.log('Domain: ' + domain);
var applicationUrl = 'http://' + domain;
swagger.configure(applicationUrl, '1.0.0');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});