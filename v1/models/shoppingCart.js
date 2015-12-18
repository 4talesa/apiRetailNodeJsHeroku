var app = require('../../server');

// import the language driver
var pg = require('pg');
var assert = require('assert');

// Suport for body variables
var bodyParser = require('body-parser');

var default_select = 'select p.*, s.name nameStore, s.address addressStore, (select sum(pi.amountPurchased * pi.unitPrice) from shoppingCartItem pi where pi.idShoppingCart = p.id) totalAmount, (select sum(pi.amountPurchased) from shoppingCartItem pi where pi.idShoppingCart = p.id) totalQuantity from shoppingCart p inner join store s on s.id = p.idStore ';

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
		client.query('insert into shoppingCart (id, idStore, idUser, status, idPaymentMethod, date, postDate, putDate, deleteDate) values ($1,$2,$3,$4,$5,now(),now(),null,null) RETURNING _id, id, idStore, idUser, status, idPaymentMethod, date, postDate, putDate, deleteDate',[data.id,data.idStore,data.idUser,data.status,data.idPaymentMethod], function(err, result) {
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
		client.query('update shoppingCart set idStore=$2, idUser=$3, status=$4, idPaymentMethod=$5, postDate = coalesce(postDate,now()), putDate = now(), deleteDate = deleteDate where id = $1',[data.id,data.idStore,data.idUser,data.status,data.idPaymentMethod], function(err, result) {
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
		client.query('delete FROM shoppingCart where id = $1',[params.id], function(err, result) {
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

var getByUser = function (req, res, next) {
	
	searchWithFilter('p.idUser = $1 and p.idStore = $2',[req.params.idUser,req.params.idStore], function(result, err){					
		console.log(result);
		if (err){
			console.log('Not found, generate one.');
			
			var data = [];
			data.id 	         = req.params.idUser+'.'+req.params.idStore;
			data.idStore 	     = req.params.idStore;
			data.idUser          = req.params.idUser;
			data.status  		 = 'pending';
			data.idPaymentMethod = '1'
			
			insertItem(data, function(result, err){					
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
exports.getByUser = getByUser;