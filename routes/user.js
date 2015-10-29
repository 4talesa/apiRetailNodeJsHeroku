var app = require('../server');

var user = require('../models/user');

app.get('/Users', user.list);

app.put('/Users/', user.put);

app.post('/Users', user.post);

app.get('/Users/:id', user.get);

app.delete('/Users/:id', user.delete);