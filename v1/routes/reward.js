module.exports = function(router){

	var reward = require('../models/reward');

	router.get('/Reward', reward.getAll);

	router.put('/Reward/', reward.put);

	router.post('/Reward', reward.post);

	router.get('/Reward/:id', reward.getOne);

	router.delete('/Reward/:id', reward.delete);
	
}