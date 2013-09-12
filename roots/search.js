var Schema = require("../schema");

var User = Schema.User;
var Group = Schema.Group;
var Flashcard = Schema.Flashcard;
var Dictionary = Schema.Dictionary;

exports.word = function(req, res){
	var word = req.param('word');
	var searchWord = "^" + word;
	Dictionary.find({'eng':{$regex:searchWord}}, function(err, result){
		//console.log("search result : " + result);
		if(word == null){
			res.send({'exist':false});
		}else{
			var tmp = JSON.stringify(result);
			res.send({'exist':true,'word':result});
		}
	});
}

exports.group = function(req, res){
	var name = req.param('name');
	var searchWord = "^" + name;
	Group.find({'name':{$regex:searchWord}}, function(err, group){
		console.log("search result : " + group);
		if(group == null){
			res.send({'exist':false});
		}else{
			var tmp = JSON.stringify(group);
			res.send({'exist':true,'word':group});
		}
	});

}

exports.allGroup = function(req, res){
	Group.find().exec( function(err, group){
		console.log("search result : " + group);
		if(group == null){
			res.send({'exist':false});
		}else{
			var tmp = JSON.stringify(group);
			res.send({'exist':true,'groups':group});
		}
	});
}


exports.flashcard = function(req, res){
	var name = req.param('name');
	var searchWord = "^" + name;
	Flashcard.find({'name':{$regex:searchWord}}, function(err, flashcard){
		console.log("search result : " + flashcard);
		if(flashcard == null){
			res.send({'exist':false});
		}else{
			var tmp = JSON.Stringify(flashcard);
			res.send({'exist':true,'flashcard':tmp});
		}
	})
}
