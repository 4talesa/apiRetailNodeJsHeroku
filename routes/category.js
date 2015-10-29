var app = require('../server');

var category = require('../models/category');

app.get('/Category', category.list);

app.put('/Category/', category.put);

app.post('/Category', category.post);

app.get('/Category/:id', category.get);

app.delete('/Category/:id', category.delete);