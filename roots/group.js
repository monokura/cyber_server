var Schema = require("../schema");
var Flashcard = Schema.Flashcard;
var Group = Schema.Group;
var User = Schema.User;

// グループ作成
// ユーザーと単語帳は空
exports.create = function(req, res){
	var name = req.param("name");
	var intro = req.param("intro");
	var master = req.param("master");
	var id = req.param("groupid");

	var newGroup = new Group();
	newGroup.name = name;
	newGroup.id = id;
	newGroup.intro = intro;
	newGroup.master = master;
	newGroup.member = new Array();
	newGroup.flashcards = new Array();
	newGroup.save(function(err){
		if(err){
			res.sender({error:true});
		}else{
			User.find({name:master}, function(err, mas){
				mas.addGroup({'id':id, 'name':name});	
			});
			res.sender({error:false});
		}
	});
}

// グループに参加
// グループにユーザー名
// ユーザーにグループ名とIDを保存
exports.join = function(req, res){
	var username = req.param("user");
	var groupid = req.param("groupid");
	var groupname = req.param("groupname");

	User.findOne({'name':username}, function(err, user){
		var newGroup = {'id':groupid,'name':groupname};
		user.addGroup(newGroup);
	});

	Group.findOne({'_id': groupid}, function(err, group){
		group.addUser(username);
	});
}

// グループから離脱
exports.defect = function(req, res){
	var username = req.param("user");
	var groupid = req.param("groupid");
	
	User.removeGroup(groupid);
	Group.removeUser(username);
}
