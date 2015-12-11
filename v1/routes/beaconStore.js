module.exports = function(router){

	var beaconStore = require('../models/beaconStore');

	router.get('/BeaconStore', beaconStore.getAll);

	router.put('/BeaconStore/', beaconStore.put);

	router.post('/BeaconStore', beaconStore.post);

	router.get('/BeaconStore/:id', beaconStore.getOne);

	router.delete('/BeaconStore/:id', beaconStore.delete);
	
}