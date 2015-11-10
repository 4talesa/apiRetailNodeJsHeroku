var BearerStrategy = require('passport-http-bearer').Strategy;

var pg = require('pg');

var tokenModel = require('../models/token');

module.exports = function(passport){
		
	passport.use(new BearerStrategy({},
			function(token, passportDone){
				tokenModel.findOne(token, function(tokenDone, err){					
					console.log(tokenDone);
					if (err){
						console.log('token not found for the _id '+token);
						console.error(err);
						return passportDone(null, false);
					}else{
						console.log('token found for the _id '+token);
						return passportDone(null, tokenDone);
					}					
				});				
			}
		)
	);
	
}