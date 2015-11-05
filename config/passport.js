var BearerStrategy = require('passport-http-bearer').Strategy;

var pg = require('pg');

module.exports = function(passport){
	passport.use(new BearerStrategy({},
			function(token, passportDone){
				pg.connect(process.env.DATABASE_URL, function(err, client, done) {
					client.query('SELECT * FROM api_user where token = $1',[token], function(err, result) {
						done();
						if (err) {
							console.log('user not found for the token '+token);
							console.error(err);
							return passportDone(null, false);
						}else{
							console.log('user found for the token '+token);
							console.log(result.rows[0]);
							return passportDone(null, result.rows[0]);
						}
					});
				});
			}
		)
	);
}