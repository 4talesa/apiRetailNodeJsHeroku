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

var findOne = function (access_token, functionDone) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM grantAuth where access_token = $1 and (current_timestamp < postDate + (expires_in ||\' seconds\')::interval)',[access_token], function(err, result) {
			done();
			if (err) {
				console.log('grantAuth not found for the grand_key '+access_token);
				console.error(err);
				return functionDone(null, 'grantAuth not found for the grand_key '+access_token);
			}else{
				if (result.rows.length>0){
					console.log('grantAuth found for the grand_key '+access_token);
					console.log(result.rows[0]);
					return functionDone(result.rows[0], false);
				}else{
					console.log('grantAuth not found for the grand_key '+access_token);
					console.error(err);
					return functionDone(null, 'grantAuth not found for the grand_key '+access_token);
				}
			}
		});
	});
};

var save = function(access_token, token_type, state, scope, clientID, redirectURI, expires_in, functionDone) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('insert into grantAuth (access_token, token_type, state, scope, clientID, redirectURI, expires_in, postDate) values ($1,$2,$3,$4,$5,$6,$7,current_timestamp) RETURNING _id, access_token, token_type, state, scope, clientID, redirectURI, expires_in, postDate',
					[access_token, token_type, state, scope, clientID, redirectURI, expires_in], function(err, result) {
			done();
			if (err) {
				console.error('grantAuth not inserted for access_token ');
				console.error(err);
				return functionDone(null, 'grantAuth not inserted for access_token '+access_token);
			}else{
				if (result.rows.length>0){
					console.log('grantAuth inserted with access_token '+access_token);
					console.log(result.rows[0]);
					return functionDone(result.rows[0], false);
				}else{
					console.error('grantAuth not inserted');
					console.error(err);
					return functionDone(null, 'grantAuth not inserted '+access_token);
				}
			}
		});
	});
};

var get = function (req, res, next) {
	
	/*
	client_id: client ID on the system
	redirect_uri: The URL the app will redirect
	scope: comma separated list of scopes
	state: An unguessable random string. It is used to protect against cross-site request forgery attacks.
	response_type: null redirect to redirect_uri, else return available JSON
	
	return a code on the uri: redirect_uri?code=AUTH_CODE_HERE
	or as json
	{
		code: string,
		state: string
	}
	*/
	
	userModel.findOne(req.query.client_id, function(findUserDone, err){					
		console.log(findUserDone);
		if (err){
			console.error('user not found for the client_id '+req.query.client_id);
			console.error(err);
			res.writeHead(200, { 'Content-Type': 'application/json' });						
			res.write(JSON.stringify({ 'Error': 'User not found' }));
			res.end();
		}else{
			console.log('valid user found for the client_id '+req.query.client_id);
			console.log( findUserDone );
			
			var access_token = utils.uid(16);
			var token_type		= 'bearer';
			var state			= req.query.state;
			var scope			= req.query.scope;
			var clientID		= req.query.scope;
			var redirectURI		= req.query.redirect_uri;
			var expires_in		= 60;
			
			//Ex: http://localhost:5000/api/v1/authorize/?client_id=1&state=ABCDEFGRANDOM&redirect_uri=http://localhost:5000/api/v1&scope=retailapp
			
			save(access_token, token_type, state, scope, clientID, redirectURI, expires_in, function(grantAuthDone, saveErr){
				if(saveErr){
					var resultError = { 'error': '000' , 'error_description': 'Fail to save token '+access_token, 'error_uri': redirectURI, 'state': state};
					
					console.error('fail to save token '+access_token);
					console.error(saveErr);
					res.writeHead(200, { 'Content-Type': 'application/json' });	
					console.log(resultError);
					res.write(JSON.stringify(resultError));
					res.end();
				}else{
					var resultSucess = {'code': access_token,
										'token_type': token_type,
										'expires_in': expires_in,
										'scope': scope,
										'state': state,
										'refresh_token': access_token,
										'access_token': access_token
										};
					
					if(req.query.response_type=='JSON')
					{
						res.writeHead(200, { 'Content-Type': 'application/json' });
						console.log(resultSucess);
						res.write(JSON.stringify(resultSucess));
						res.end();
					}else{
						console.log(resultSucess);
						var urlRedirectTo = req.query.redirect_uri+'?code='+access_token+'&state='+state+'&access_token='+access_token+'&expires_in'+expires_in;
						console.log('Redirect to: '+urlRedirectTo);
						res.redirect(urlRedirectTo);
					}
				}
			});			
		}					
	});
};

exports.findOne = findOne;
exports.save 	= save;
exports.get 	= get;