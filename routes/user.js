var app = require('../server');

var user = require('../models/user');

app.get('/User', user.list);

app.put('/User/', user.put);

app.post('/User', user.post);

app.get('/User/:id', user.get);

app.delete('/User/:id', user.delete);