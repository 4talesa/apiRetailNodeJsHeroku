var express = require('express');
var app = express();
var fs = require("fs");

// import the language driver
var pg = require('pg');
var assert = require('assert');

var user = require('./routes/user');

// Connection URL for local mongodb server
var url = process.env.DATABASE_URL;

app.set('port', (process.env.PORT || 8081));

// Suport for body variables
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Enable Cors
//var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/listUsers', user.listUsers);

app.post('/addUser', user.addUser);

app.get('/getUser/:id', user.getUser);

app.post('/delUser/:id', user.delUser);

app.post('/updUser/', user.updUser);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});