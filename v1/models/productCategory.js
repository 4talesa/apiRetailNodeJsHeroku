var app = require('../../server');

// import the language driver
var pg = require('pg');
var assert = require('assert');

// Suport for body variables
var bodyParser = require('body-parser');

exports.getAll = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM productCategory', function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.send("Error " + err);
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				console.log( result.rows );
				res.write(JSON.stringify(result.rows));
				res.end();
			}
		});
	});
};

exports.post = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('insert into productCategory (id, idProduct, idCategory, postDate, putDate, deleteDate) values ($1,$2,$3,now(),null,null) RETURNING _id, id, idProduct, idCategory, postDate, putDate, deleteDate',[req.body.id,req.body.idProduct,req.body.idCategory], function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.send("Error " + err);
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				console.log( result.rows );
				res.write(JSON.stringify(result.rows));
				res.end();
			}
		});
	});
};

exports.getOne = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM productCategory where id = $1',[req.params.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.send("Error " + err);
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				console.log( result.rows );
				res.write(JSON.stringify(result.rows));
				res.end();
			}
		});
	});
};

exports.delete = function (req, res, next) {

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM productCategory where id = $1',[req.params.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.send("Error " + err);
			}else{
				var userFound = result.rows;
				client.query('delete FROM productCategory where id = $1',[req.params.id], function(err, result) {
					done();
					if (err) {
						console.error(err);
						res.send("Error " + err);
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
};

exports.put = function (req, res, next) {

   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM productCategory where id = $1',[req.body.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.send("Error " + err);
			}else{
				var userFound = result.rows;
				client.query('update productCategory set idProduct=$2, idCategory=$3, postDate = coalesce(postDate,now()), putDate = now(), deleteDate = deleteDate where id = $1',[req.body.id,req.body.idProduct,req.body.idCategory], function(err, result) {
					done();
					if (err) {
						console.error(err);
						res.send("Error " + err);
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
};