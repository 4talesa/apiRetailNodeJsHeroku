var app = require('../../server');

var fs = require("fs");

var index = require('./index');

app.get(index.version+'/docs', function(req, res, next) {

	var data = [];
	
	data = {'Error': 'Swagger not configured', 'Message': 'Please configure the swagger here'};
	
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify(data));
	res.end();
});

app.get(index.version+'/swagger.json', function(req, res, next) {

	var file = __dirname + '/../../' + index.version + '/doc/swagger.json';

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