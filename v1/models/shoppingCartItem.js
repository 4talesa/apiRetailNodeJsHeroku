var app = require('../../server');

// import the language driver
var pg = require('pg');
var assert = require('assert');

// Suport for body variables
var bodyParser = require('body-parser');

var default_select = 'SELECT pi.*, p.name description, p.unit, (pi.amountPurchased * pi.unitPrice) totalItem, p.pictureUrl, \'test\' categoryName, \'test\' brandName FROM shoppingCartItem pi inner join product p on pi.idproduct = p.id ';

exports.getAll = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query(default_select, function(err, result) {
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
		client.query('insert into shoppingCartItem (id, idShoppingCart, idProduct, status, amountRequested, amountPurchased, postDate, putDate, deleteDate) values ($1,$2,$3,$4,$5,$6,now(),null,null) RETURNING _id, id, idShoppingCart, idProduct, status, amountRequested, amountPurchased, postDate, putDate, deleteDate',[req.body.id,req.body.idShoppingCart,req.body.idProduct,req.body.status,req.body.amountRequested,req.body.amountPurchased], function(err, result) {
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
		client.query(default_select+' where p.id = $1',[req.params.id], function(err, result) {
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
		client.query('SELECT * FROM shoppingCartItem where id = $1',[req.params.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.send("Error " + err);
			}else{
				var userFound = result.rows;
				client.query('delete FROM shoppingCartItem where id = $1',[req.params.id], function(err, result) {
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
		client.query('SELECT * FROM shoppingCartItem where id = $1',[req.body.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.send("Error " + err);
			}else{
				var userFound = result.rows;
				client.query('update shoppingCartItem set idShoppingCart=$2, idProduct=$3, status=$4, amountRequested=$5, amountPurchased=$6, postDate = coalesce(postDate,now()), putDate = now(), deleteDate = deleteDate where id = $1',[req.body.id,req.body.idShoppingCart,req.body.idProduct,req.body.status,req.body.amountRequested,req.body.amountPurchased], function(err, result) {
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

exports.getByShoppingCart = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query(default_select+' where p.idShoppingCart = $1',[req.params.id], function(err, result) {
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