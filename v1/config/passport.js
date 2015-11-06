var BearerStrategy = require('passport-http-bearer').Strategy;

var pg = require('pg');

var tokenModel = require('../models/token');

module.exports = function(passport){
		
	passport.use(new BearerStrategy({},
			function(token, passportDone){
				tokenModel.findToken(token, function(tokenDone, err){					
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
				/*pg.connect(process.env.DATABASE_URL, function(err, client, done) {
					client.query('SELECT * FROM token where _id = $1 and expireDate > current_timestamp',[token], function(err, result) {
						done();
						if (err) {
							console.log('token not found for the _id '+token);
							console.error(err);
							return passportDone(null, false);
						}else{
							console.log('token found for the _id '+token);
							console.log(result.rows[0]);
							return passportDone(null, result.rows[0]);
						}
					});
				});*/
			}
		)
	);
	
}