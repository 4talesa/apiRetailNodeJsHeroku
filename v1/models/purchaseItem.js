var app = require('../../server');

// import the language driver
var pg = require('pg');
var assert = require('assert');

// Suport for body variables
var bodyParser = require('body-parser');

var default_select = 'SELECT pi.*, p.name description, p.unit, (pi.amountPurchased * pi.unitPrice) totalItem, p.pictureUrl, \'test\' categoryName, \'test\' brandName FROM purchaseItem pi inner join product p on pi.idproduct = p.id ';

exports.getAll = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query(default_select, function(err, result) {
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
};

exports.post = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('insert into purchaseItem (id, idPurchase, idProduct, status, amountRequested, amountPurchased, unitPrice, postDate, putDate, deleteDate) values ($1,$2,$3,$4,$5,$6,$7,now(),null,null) RETURNING _id, id, idPurchase, idProduct, status, amountRequested, amountPurchased, unitPrice, postDate, putDate, deleteDate',[req.body.id,req.body.idPurchase,req.body.idProduct,req.body.status,req.body.amountRequested,req.body.amountPurchased,req.body.unitPrice], function(err, result) {
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
};

exports.getOne = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query(default_select+' where pi.id = $1',[req.params.id], function(err, result) {
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
};

exports.delete = function (req, res, next) {

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM purchaseItem where id = $1',[req.params.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				response.send("Error " + err);
			}else{
				var userFound = result.rows;
				client.query('delete FROM purchaseItem where id = $1',[req.params.id], function(err, result) {
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
};

exports.put = function (req, res, next) {

   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM purchaseItem where id = $1',[req.body.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				response.send("Error " + err);
			}else{
				var userFound = result.rows;
				client.query('update purchaseItem set idPurchase=$2, idProduct=$3, status=$4, amountRequested=$5, amountPurchased=$6, unitPrice=$7, postDate = coalesce(postDate,now()), putDate = now(), deleteDate = deleteDate where id = $1',[req.body.id,req.body.idPurchase,req.body.idProduct,req.body.status,req.body.amountRequested,req.body.amountPurchased,req.body.unitPrice], function(err, result) {
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
};

exports.getByPurchase = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query(default_select+' where pi.idPurchase = $1',[req.params.id], function(err, result) {
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
};