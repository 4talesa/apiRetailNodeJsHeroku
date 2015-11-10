var app = require('../../server');

// import the language driver
var pg = require('pg');
var assert = require('assert');

// Suport for body variables
var bodyParser = require('body-parser');

// Utils
utils = require('../lib/utils');

// Models
userModel = require('./user');
grantAuthModel = require('./grantAuth');

var findOne = function (token, functionDone) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM token where access_token = $1 and (current_timestamp < postDate + (expires_in ||\' seconds\')::interval)',[token], function(err, result) {
			done();
			if (err) {
				console.log('token not found for the _id '+token);
				console.error(err);
				return functionDone(null, 'token not found for the _id '+token);
			}else{
				if (result.rows.length>0){
					console.log('token found for the _id '+token);
					console.log(result.rows[0]);
					return functionDone(result.rows[0], false);
				}else{
					console.log('token not found for the _id '+token);
					console.error(err);
					return functionDone(null, 'token not found for the _id '+token);
				}
			}
		});
	});
};

var save = function(access_token, token_type, state, scope, clientID, redirectURI, expires_in, functionDone) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('insert into token (access_token, token_type, state, scope, clientID, redirectURI, expires_in, postDate) values ($1,$2,$3,$4,$5,$6,$7,current_timestamp) RETURNING _id, access_token, token_type, state, scope, clientID, redirectURI, expires_in, postDate',
					[access_token, token_type, state, scope, clientID, redirectURI, expires_in], function(err, result) {
			done();
			if (err) {
				console.error('token not inserted for access_token ');
				console.error(err);
				return functionDone(null, 'token not inserted for access_token '+access_token);
			}else{
				if (result.rows.length>0){
					console.log('token inserted with access_token '+access_token);
					console.log(result.rows[0]);
					return functionDone(result.rows[0], false);
				}else{
					console.error('token not inserted');
					console.error(err);
					return functionDone(null, 'token not inserted '+access_token);
				}
			}
		});
	});
};

var get = function (req, res, next) {
	
	/*
	client_id: client ID on the system
	client_secret: client secret on the system
	redirect_uri: The URL the app will redirect
	code: access_grantAuth
	state: An unguessable random string. It is used to protect against cross-site request forgery attacks.
	
	return sucess
	{
		access_token: string,
		token_type: "bearer",
		expires_in: integer,
		scope: "retailapp",		
		state: string		
	}
	
	return error
	{
		error: integer,
		error_description: string,
		error_uri: string,
		state: string
	}
	*/
	
	grantAuthModel.findOne(req.query.code, function(findGrantAuthDone, err){					
		console.log(findGrantAuthDone);
		if (err){
			console.error('grant not found for the grand_key '+req.query.code);
			console.error(err);
			res.writeHead(200, { 'Content-Type': 'application/json' });						
			res.write(JSON.stringify({ 'Error': 'User not found' }));
			res.end();
		}else{
			console.log('valid grant found for the grand_key '+req.query.code);
			console.log( findGrantAuthDone );
			
			var access_token 	= utils.uid(16);
			var token_type 		= findGrantAuthDone.token_type;
			var state      		= findGrantAuthDone.state;
			var scope			= findGrantAuthDone.scope;
			var clientID		= findGrantAuthDone.client_id;
			var redirectURI		= findGrantAuthDone.redirect_uri;
			var expires_in 		= 60;
			
			//Ex: http://localhost:5000/api/v1/authorize/?code=access_token&client_id=1&state=ABCDEFGRANDOM&redirect_uri=http://localhost:5000/api/v1&scope=retailapp
			
			save(access_token, token_type, state, scope, clientID, redirectURI, expires_in, function(saveTokenDone, saveErr){
				if(saveErr){
					var resultError = { 'error': '000' , 'error_description': 'Fail to save token '+access_token, 'error_uri': redirectURI, 'state': state};
					
					console.error('fail to save token '+access_token);
					console.error(saveErr);
					res.writeHead(200, { 'Content-Type': 'application/json' });	
					console.log(resultError);
					res.write(JSON.stringify(resultError));
					res.end();
				}else{
					var resultSucess = { 'access_token': access_token , 'token_type': token_type, 'expires_in': expires_in, 'scope': scope, 'state': state};
					
					res.writeHead(200, { 'Content-Type': 'application/json' });
					console.log(resultSucess);
					res.write(JSON.stringify(resultSucess));
					res.end();						
				}
			});
		}					
	});
};

exports.findOne = findOne;
exports.save 	= save;
exports.get 	= get;