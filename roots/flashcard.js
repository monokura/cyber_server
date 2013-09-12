var Schema = require("../schema");
var Flashcard = Schema.Flashcard;
var Group = Schema.Group;
var User = Schema.User;

// 単語帳作成
exports.create = function(req, res){
	var name = req.body.name;
	var intro = req.body.intro;
	var master = req.body.master;
	var group = JSON.parse(req.body.group);
	var level = req.body.level;
	var date = req.body.date;
	var words = JSON.parse(req.body.words);
	var id = name + date;

	console.log("name : " + name);
	console.log("intro : " + intro);
	console.log("master : " + master);
	console.log("group : " + group);
	console.log("level : " + level);
	console.log("date : " + date);
	console.log("words : " + words);

	var newFlashcard = new Flashcard();
	newFlashcard.name = name;
	newFlashcard.id = id;
	newFlashcard.intro = intro;
	newFlashcard.master = master;
    var groupArray = new Array();
    for(var i = 0;i < group.length;i++){
		groupArray.push(group[i]);
    }
	newFlashcard.group = groupArray;
	newFlashcard.level = level;
	newFlashcard.update = date;
	var wordArray = new Array();

	for (var index in words) {
	    wordArray.push({'eng':words[index]['eng'], 'jap':words[index]['jap']});
	    console.log(words[index]["eng"] + ":" + words[index]["jap"]);
	}
	newFlashcard.words = wordArray;
	newFlashcard.save(function(err){
		console.log("save result is ...");
		if(err != null){
			console.log("err");
			res.send({error:true,message:err});
		}else{
			console.log("success");
			//  ユーザーに単語帳を追加
			User.update({name:master},{$push:{flashcards:{'id':id,'name':name}}}, function(err){
				//  グループに単語帳を登録
				for(var index in groupArray){
					Group.findOne({_id:groupArray[index]},function(err, gr){
						if(gr != null){
							gr.addFlashcard(name, id);
						}	
					});
				}
				res.send({error:false});

			})

		}
	});
}

// 他人の単語帳を登録する
// ユーザー情報に単語帳を追加
exports.addToUser = function(req, res){
	var username = req.param("user");
	var flashcardid = req.param("flashcardid");
	var flashcardname = req.param("flashcardname");

	User.findOne({'name':username}, function(err, user){
		var newFlashcard = {'id':flashcardid,'name':flashcardname};
		user.addFlashcard(newFlashcard);
	});
}

// 一つの単語帳を複数のグループに同時に登録
exports.addToGroups = function(req, res){
	var flashcardid = req.param('flashcardid');
	var flashcardname = req.param('flashcardname');
	var groupArray = req.param('groupArray');	// グループIDの配列

	for(var i = 0;i < groupArray.length;i++){
		addToGroup(groupArray[i], flashcardid, flashcardname);
	}
}

// グループ情報に単語帳を登録する
function addToGroup(groupid, flashcardid, flashcardname){
	Group.find({_id:groupid}, function(err, group){
		group.addFlashcard();	
	});
}

// ユーザー情報から単語帳を削除する
exports.defectFromUser = function(req, res){
	var username = req.param("user");
	var flashcardid = req.param("flashcardid");
	
	User.find({name:username}, function(err, user){
		user.removeFlashcard(flashcardid);	
	});
}

// グループ情報から単語帳を削除する
exports.defectFromGroup = function(req,res){
	var groupid = req.param("groupid");
	var flashcardid = req.param("flashcardid");

	Group.find({_id:groupid}, function(err,group){
		group.removeFlashcard(flashcardid);	
	});

	Flashcard.find({_id:flashcardid},function(err, flashcard){
		flashcard.removeGroup(groupid);	
	})
}
