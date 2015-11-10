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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('insert into api_log (originalUrl, url, postDate) values ($1,$2,current_timestamp) RETURNING _id, originalUrl, url, postDate',
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
	});
  console.log('req.originalUrl: '+ req.originalUrl);
  console.log('req.url: '+ req.url);
  console.log('req.body: '+JSON.stringify(req.body));
  //var jsonObject = JSON.parse(req.body);
	
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});