var express = require('express');
var app = express();
var fs = require("fs");

var app = module.exports = express(); 

// import the language driver
var pg = require('pg');
var assert = require('assert');

app.set('port', (process.env.PORT || 5000));

// Suport for body variables
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routes
require('./routes/index');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});