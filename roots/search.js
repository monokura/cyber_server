var Schema = require("../schema");

var User = Schema.User;
var Groop = Schema.Groop;
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
			res.send({'exist':true,'word':tmp});
		}
	});
}

exports.groop = function(req, res){
	var name = req.param('name');
	var searchWord = "^" + name;
	Groop.find({'name':{$regex:searchWord}}, function(err, groop){
		console.log("search result : " + groop);
		if(groop == null){
			send({'exist':false});
		}else{
			var tmp = JSON.stringify(groop);
			send({'exist':true,'word':tmp});
		}
	});

}

exports.flashcard = function(req, res){
	var name = req.param('name');
	var searchWord = "^" + name;
	Flashcard.find({'name':{$regex:searchWord}}, function(err, flashcard){
		console.log("search result : " + flashcard);
		if(flashcard == null){
			send({'exist':false});
		}else{
			var tmp = JSON.Stringify(flashcard);
			send({'exist':true,'flashcard':tmp});
		}
	})
}
