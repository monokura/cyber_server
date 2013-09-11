var Schema = require("../schema");
var Flashcard = Schema.Flashcard;
var Groop = Schema.Groop;
var User = Schema.User;

// 単語帳作成
exports.create = function(req, res){
	var name = req.body.name;
	var intro = req.body.intro;
	var master = req.body.master;
	var groop = req.body.groop;
	var level = req.body.level;
	var date = req.body.date;
	var words = req.body.words;

	console.log("name : " + name);
	console.log("intro : " + intro);
	console.log("master : " + master);
	console.log("groop : " + groop);
	console.log("level : " + level);
	console.log("date : " + date);
	console.log("words : " + words);

	var newFlashcard = new Flashcard();
	newFlashcard.name = name;
	newFlashcard.id = name + date;
	newFlashcard.intro = intro;
	newFlashcard.master = master;
	newFlashcard.groop = groop;
	newFlashcard.level = level;
	newFlashcard.update = date;
	for(var i =0; i < words.length;i++){
		newFlashcard.words.addWord(words.eng, words.jap);
	}
	newFlashcard.save();
	res.send({error:true,message:"成功したよ"});
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
exports.addToGroops = function(req, res){
	var flashcardid = req.param('flashcardid');
	var flashcardname = req.param('flashcardname');
	var groopArray = req.param('groopArray');	// グループIDの配列

	for(var i = 0;i < groopArray.length;i++){
		addToGroop(groopArray[i], flashcardid, flashcardname);
	}
}

// グループ情報に単語帳を登録する
function addToGroop(groopid, flashcardid, flashcardname){
	Groop.find({_id:groopid}, function(err, groop){
		groop.addFlashcard();	
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
exports.defectFromGroop = function(req,res){
	var groopid = req.param("groopid");
	var flashcardid = req.param("flashcardid");

	Groop.find({_id:groopid}, function(err,groop){
		groop.removeFlashcard(flashcardid);	
	});

	Flashcard.find({_id:flashcardid},function(err, flashcard){
		flashcard.removeGroop(groopid);	
	})
}
