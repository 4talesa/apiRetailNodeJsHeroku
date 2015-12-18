var app = require('../../server');

// import the language driver
var pg = require('pg');
var assert = require('assert');

// Suport for body variables
var bodyParser = require('body-parser');

var default_select = 'SELECT pi.*, p.name description, p.unit, (pi.amountPurchased * pi.unitPrice) totalItem, p.pictureUrl, \'test\' categoryName, \'test\' brandName FROM shoppingCartItem pi inner join product p on pi.idproduct = p.id ';

var searchWithFilter = function (filter,filterValues, functionDone) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var searchSelect = default_select;
		if (filter != null){
			if (filter.length > 1){
				searchSelect += ' where '+filter;
			}
		}
		client.query(searchSelect, filterValues, function(err, result) {
			done();
			if (err) {
				console.error(err);
				return functionDone(null, 'no data found');
			}else{
				if (result.rows.length>0){
					console.log(result.rows);
					return functionDone(result, false);
				}else{
					console.error(err);
					return functionDone(null, 'no data found');
				}
			}
		});
	});
};

var insertItem = function (data, functionDone) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {		
		client.query('insert into shoppingCartItem (id, idShoppingCart, idProduct, status, amountRequested, amountPurchased, unitPrice, postDate, putDate, deleteDate) values ($1,$2,$3,$4,$5,$6,$7,now(),null,null) RETURNING _id, id, idShoppingCart, idProduct, status, amountRequested, amountPurchased, unitPrice, postDate, putDate, deleteDate',[data.id,data.idShoppingCart,data.idProduct,data.status,data.amountRequested,data.amountPurchased,data.unitPrice], function(err, result) {
			done();
			if (err) {
				console.error(err);
				return functionDone(null, 'no data found');
			}else{
				if (result.rows.length>0){
					console.log(result.rows);
					return functionDone(result, false);
				}else{
					console.error(err);
					return functionDone(null, 'no data found');
				}
			}
		});
	});
};

var updateItem = function (data, functionDone) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('update shoppingCartItem set idShoppingCart=$2, idProduct=$3, status=$4, amountRequested=$5, amountPurchased=$6, unitPrice=$7, postDate = coalesce(postDate,now()), putDate = now(), deleteDate = deleteDate where id = $1',[data.id,data.idShoppingCart,data.idProduct,data.status,data.amountRequested,data.amountPurchased,data.unitPrice], function(err, result) {
			done();
			if (err) {
				console.error(err);
				return functionDone(null, 'no data found');
			}else{
				if (result.rows.length>0){
					console.log(result.rows);
					return functionDone(result, false);
				}else{
					console.error(err);
					return functionDone(null, 'no data found');
				}
			}
		});
	});
};

var deleteItem = function (params, functionDone) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('delete FROM shoppingCartItem where id = $1',[params.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				return functionDone(null, 'no data found');
			}else{
				if (result.rows.length>0){
					console.log(result.rows);
					return functionDone(result, false);
				}else{
					console.error(err);
					return functionDone(null, 'no data found');
				}
			}
		});
	});
};

var getAll = function (req, res, next) {
	
	searchWithFilter('',null, function(result, err){					
		console.log(result);
		if (err){
			console.error(err);
			res.end("[]");
		}else{
			res.writeHead(200, { 'Content-Type': 'application/json' });
			console.log( result.rows );
			res.write(JSON.stringify(result.rows));
			res.end();
		}
	});
	
};

var post = function (req, res, next) {
	
	insertItem(req.body, function(result, err){					
		console.log(result);
		if (err){
			console.error(err);
			res.end("[]");
		}else{
			res.writeHead(200, { 'Content-Type': 'application/json' });
			console.log( result.rows );
			res.write(JSON.stringify(result.rows));
			res.end();
		}
	});
	
};

var getOne = function (req, res, next) {
	
	searchWithFilter('pi.id = $1',[req.params.id], function(result, err){					
		console.log(result);
		if (err){
			console.error(err);
			res.end("[]");
		}else{
			res.writeHead(200, { 'Content-Type': 'application/json' });
			console.log( result.rows );
			res.write(JSON.stringify(result.rows));
			res.end();
		}
	});
	
};

var deleteOne = function (req, res, next) {
	
	searchWithFilter('pi.id = $1',[req.params.id], function(result, err){					
		console.log(result);
		if (err){
			console.error(err);
			res.end("[notfound]");
		}else{
			deleteItem(req.params, function(result, err){					
				console.log(result);
				if (err){
					console.error(err);
					res.end("[]");
				}else{
					res.writeHead(200, { 'Content-Type': 'application/json' });
					console.log( "[deleted]" );
					res.write("[deleted]");
					res.end();
				}
			});
		}
	});
	
};

var put = function (req, res, next) {
	
	searchWithFilter('pi.id = $1',[req.body.id], function(result, err){
		if (err){
			insertItem(req.body, function(result, err){					
				console.log(result);
				if (err){
					console.error(err);
					res.end("[]");
				}else{
					res.writeHead(200, { 'Content-Type': 'application/json' });
					console.log( result.rows );
					res.write(JSON.stringify(result.rows));
					res.end();
				}
			});
		}else{
			updateItem(req.body, function(result, err){					
				console.log(result);
				if (err){
					console.error(err);
					res.end("[]");
				}else{
					res.writeHead(200, { 'Content-Type': 'application/json' });
					console.log( result.rows );
					res.write(JSON.stringify(result.rows));
					res.end();
				}
			});
		}
	});

};

var getByShoppingCart = function (req, res, next) {
	
	searchWithFilter('pi.idShoppingCart = $1',[req.params.id], function(result, err){					
		console.log(result);
		if (err){
			console.error(err);
			res.end("[]");
		}else{
			res.writeHead(200, { 'Content-Type': 'application/json' });
			console.log( result.rows );
			res.write(JSON.stringify(result.rows));
			res.end();
		}
	});
	
};

exports.getAll = getAll;
exports.put = put;
exports.post = post;
exports.getOne = getOne;
exports.deleteOne = deleteOne;
exports.getByShoppingCart = getByShoppingCart;