var express = require("express");
var mongoose = require("mongoose");
var schema = require("./schema");

mongoose.connect('mongodb://localhost/ca_app');
var app = express();
app.use(express.bodyParser());

var auth = require("./roots/auth");
var search = require("./roots/search");
var group = require("./roots/group");
var flashcard = require("./roots/flashcard");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	app.get('/login', auth.login);
	app.get('/register', auth.register);

	app.get('/searchUser', search.user);
	app.get('/searchWord', search.word);
	app.get('/searchGroup', search.group);
	app.get('/searchFlashcard', search.flashcard);
	app.get('/searchAllGroup', search.allGroup);


	app.get('/createGroup', group.create);
	//app.get('createFlashcard', flashcard.create);
	app.post('/createFlashcard', flashcard.create);
	app.listen(3000);
	console.log('run server. port 3000...');
	console.log('Enter [ctrl]+C to stop server.');
})
