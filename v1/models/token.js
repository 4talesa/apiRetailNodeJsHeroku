var app = require('../../server');

// import the language driver
var pg = require('pg');
var assert = require('assert');

// Suport for body variables
var bodyParser = require('body-parser');

exports.getByUser = function (req, res, next) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM token where idUser = $1 and expireDate > current_timestamp',[req.params.id], function(err, result) {
			done();
			if (err) {
				console.error(err);
				response.send("Error " + err);									
			}else{
				if (result.rows.length>0){
					console.log('valid token found for the user id '+req.params.id);
					res.writeHead(200, { 'Content-Type': 'application/json' });						
					console.log( result.rows[0] );
					res.write(JSON.stringify(result.rows[0]));
					res.end();
				}else{						
					console.error('valid token not found for the user id '+req.params.id);						
					client.query('insert into token (idUser, expireDate) values ($1,current_timestamp + (5 ||\' minutes\')::interval) RETURNING _id, idUser, expireDate',[req.params.id], function(err, result) {
						done();						
						if (err) {								
							console.error(err);
							res.send("Error " + err);
						}else{
							console.log('log04');
							console.log('valid token insert for the user id '+req.params.id);
							res.writeHead(200, { 'Content-Type': 'application/json' });
							console.log( result.rows[0] );
							res.write(JSON.stringify(result.rows[0]));
							res.end();
						}
					});
				}
			}
		});
	});
};

exports.findToken = function (token, tokenDone) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM token where _id = $1 and expireDate > current_timestamp',[token], function(err, result) {
			done();
			if (err) {
				console.log('token not found for the _id '+token);
				console.error(err);
				return tokenDone(null, 'token not found for the _id '+token);
			}else{
				console.log('token found for the _id '+token);
				console.log(result.rows[0]);
				return tokenDone(result.rows[0], false);
			}
		});
	});
}