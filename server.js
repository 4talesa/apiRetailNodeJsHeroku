var express = require('express');
var app = express();
var fs = require("fs");

// import the language driver
var pg = require('pg');
var assert = require('assert');

// Connection URL for local mongodb server
var url = process.env.DATABASE_URL;

app.set('port', (process.env.PORT || 8081));

// Suport for body variables
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Enable Cors
//var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/listUsers', function (req, res, next) {
	
	console.log( "/listUsers/" );
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM api_user', function(err, result) {
			done();
			if (err) {
				console.error(err);
				response.send("Error " + err);
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				console.log( result.rows );
				res.write(JSON.stringify(result.rows));
				res.end();
			}
		});
	});
});

app.post('/addUser', function (req, res, next) {
	
	console.log( "/addUser/" );
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('insert into api_user (id, name, password, profession) values ($1,$2,$3,$4) RETURNING _id, id, name, password, profession',[req.body.id,req.body.name,req.body.password,req.body.profession], function(err, result) {
			done();
			if (err) {
				console.error(err);
				response.send("Error " + err);
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				console.log( result.rows );
				res.write(JSON.stringify(result.rows));
				res.end();
			}
		});
	});
});

app.get('/getUser/:id', function (req, res, next) {
	
	console.log( "/getUser/" + req.params.id );
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM api_user where id = $1',[req.params.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				response.send("Error " + err);
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				console.log( result.rows );
				res.write(JSON.stringify(result.rows));
				res.end();
			}
		});
	});
});

app.post('/delUser/:id', function (req, res, next) {

   console.log( "/delUser/" + req.params.id );
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM api_user where id = $1',[req.params.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				response.send("Error " + err);
			}else{
				var userFound = result.rows;
				client.query('delete FROM api_user where id = $1',[req.params.id], function(err, result) {
					done();
					if (err) {
						console.error(err);
						response.send("Error " + err);
					}else{
						res.writeHead(200, { 'Content-Type': 'application/json' });
						console.log( userFound );
						res.write(JSON.stringify(userFound));
						res.end();
					}
				});
			}
		});
	});
});

app.post('/updUser/', function (req, res, next) {

   console.log( "/updUser/" );
   
   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM api_user where id = $1',[req.body.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				response.send("Error " + err);
			}else{
				var userFound = result.rows;
				client.query('update api_user set name=$1, password=$2, profession=$3 where id = $4',[req.body.name,req.body.password,req.body.profession,req.body.id], function(err, result) {
					done();
					if (err) {
						console.error(err);
						response.send("Error " + err);
					}else{
						res.writeHead(200, { 'Content-Type': 'application/json' });
						console.log( userFound );
						console.log( '**************************' );
						console.log( result );
						res.write(JSON.stringify(userFound));
						res.end();
					}
				});
			}
		});
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});