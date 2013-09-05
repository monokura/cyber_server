var express = require("express");
var mongoose = require("mongoose");
var schema = require("./schema");

mongoose.connect('mongodb://localhost/test');

var app = express();

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	app.get('/', );
	app.get('/login',);
	app.get('/register',);

	app.listen(3000);
	console.log('run server. port 3000...');
	console.log('Enter [ctrl]+C to stop server.');
}
