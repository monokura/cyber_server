var express = require("express");
var mongoose = require("mongoose");
var schema = require("./schema");

mongoose.connect('mongodb://localhost/ca_app');
var app = express();

var auth = require("./roots/auth");
var search = require("./roots/search");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	app.get('/login', auth.login);
	app.get('/register', auth.register);

	app.get('/searchWord', search.word);
	app.get('/searchGroop', search.groop);
	app.get('/searchFlashcard', search.flashcard);

	app.listen(3000);
	console.log('run server. port 3000...');
	console.log('Enter [ctrl]+C to stop server.');
})
