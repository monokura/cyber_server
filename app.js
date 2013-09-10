var express = require("express");
var mongoose = require("mongoose");
var schema = require("./schema");

mongoose.connect('mongodb://localhost/ca_app');

var app = express();

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	app.get('/login',function(req, res){
		console.log("login");
		var name = req.param("name");
		var pass = req.param("pass");
		// name is empty
		if(!name){
			console.log("name is empty");
		}
		// pass is empty
		if(!pass){
			console.log("pass is empty");
		}

		var User = schema.User;
		var search = {'name':name,'pass': pass};

		User.findOne(search,function(err, user){
			console.log(user);
			if(err){
				console.log("error is occur");
				return;
			}
			if(user == null){
				// name or pass is different
				console.log("name or pass is wrong");
				res.send({'error':true,'message':"name or pass is wrong"});
			}else{
				// login success
				console.log("login success : " + name);
				res.send({'error':false, 'name':name});
			}
		});
	})
	app.get('/register',function(req, res){
		var name = req.param("name");
		var pass = req.param("pass");

		var User = db.model("User");
		var search = {"name" : name};
		User.findOne(search,function(err, user){
			console.log(user);
			if(user == null){
				// name os uniqe
				console.log("create account :" + name );
				var newUser = new User();
				newUser.name = name;
				newUser.pass = pass;
				newUser.save();
				res.send({'error':false,'name':name});
			}else{
				// same name is found
				console.log("This name is used : " + name);
				res.send({'error':true,'message':"same name is found"});
			}
		})
	});

	app.get('/searchWord',function(req, res){
		var word = req.param('word');
		var dic = db.model("Dictionary");
		console.log("word :" + word);
		dic.find({'eng':word}, function(err, result){
			//console.log("search result : " + result);
			if(word == null){
				res.send({'exist':false});
			}else{
				var tmp = JSON.stringify(result);
				
				res.send({'exist':true,'word':tmp});
			}
		});
	});

	app.get('/searchGroop', function(req, res){
		var name = req.param('name');
		var groops = db.model('Groop');
		groops.find({'name':"*"+name+"*"}, function(err, groop){
			console.log("search result : " + groop);
			if(groop == null){
				send({'exist':false});
			}else{
				var tmp = JSON.stringify(groop);
				send({'exist':true,'word':groop});
			}
		});

	});

	app.get('/searchFlashcard', function(req, res){
		var name = req.param('name');
		var flashcards = db.model('Flashcard');
		flashcards.find({'name':"*"+name+"*"}, function(err, flashcard){
			console.log("search result : " + flashcard);
			if(flashcard == null){
				send({'exist':false});
			}else{
				send({'exist':true,'flashcard':flashcard});
			}
		})
	});

	app.listen(3000);
	console.log('run server. port 3000...');
	console.log('Enter [ctrl]+C to stop server.');
})
