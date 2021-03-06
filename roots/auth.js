var Schema = require("../schema")
var User = Schema.User;

exports.login = function(req, res){
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
			res.send({'error':true,'message':"名前とパスワードが一致しません"});
		}else{
			// login success
			console.log("login success : " + name);
			//res.send({'error':false, 'user':user});
			updateLocaleData(name, res);
		}
	})
}

function updateLocaleData(name , res){
	User.findOne({'name':name}, function(err, user){
	var username = user.name;
	var userFlashcards = user.flashcards;
	var userGroups = user.groups;
	res.send({'error':false,'name':username,'flashcards':userFlashcards,'groups':userGroups});
	});
}

exports.register = function(req, res){
	var name = req.param("name");
	var pass = req.param("pass");

	var search = {"name" : name};
	User.findOne(search,function(err, user){
		console.log(user);
		if(user == null){
			// name is uniqe
			console.log("create account :" + name );
			var newUser = new User();
			newUser.name = name;
			newUser.pass = pass;
			newUser.flashcards = new Array();
			newUser.groups = new Array();
			newUser.save();
			res.send({'error':false,'name':name});
		}else{
			// same name is found
			console.log("This name is used : " + name);
			res.send({'error':true,'message':"そのアカウント名は使用済みです"});
		}
	})
}
