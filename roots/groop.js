var Schema = require("../schema");
var Flashcard = Schema.Flashcard;
var Groop = Schema.Groop;
var User = Schema.User;

// グループ作成
// ユーザーと単語帳は空
exports.create = function(req, res){
	var name = req.param("name");
	var intro = req.param("intro");
	var master = req.param("master");

	var newGroop = new Groop();
	newGroop.name = name;
	newGroop.intro = intro;
	newGroop.master = master;
	newGroop.save();
}

// グループに参加
// グループにユーザー名
// ユーザーにグループ名とIDを保存
exports.join = function(req, res){
	var username = req.param("user");
	var groopid = req.param("groopid");
	var groopname = req.param("groopname");

	User.findOne({'name':username}, function(err, user){
		var newGroop = {'id':groopid,'name':groopname};
		user.addGroop(newGroop);
	});

	Groop.findOne({'_id': groopid}, function(err, groop){
		groop.addUser(username);
	});
}

// グループから離脱
exports.defect = function(req, res){
	var username = req.param("user");
	var groopid = req.param("groopid");
	
	User.removeGroop(groopid);
	Groop.removeUser(username);
}
