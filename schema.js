var mongoose = require('mongoose');

//---------------user-----------------
var userSchema = mongoose.Schema({
	name : String,
    pass : String,
	flashcards :[{id:String,
				name:String}],
	groups:[{id:String,
			name:String}]
});

userSchema.methods.addFlashcard = function(newFlashcard){
	console.log("====addFlash=====");
	this.flashcards.push(newFlashcard);
	console.log("----" + newFlashcard + "----")
}

userSchema.methods.addGroup = function(newGroup){
	this.groups.push(newGroup);
}

userSchema.methods.removeFlashcard = function(flashcardid){
	User.flashcards.remove({id:flashcardid},function(err){
		// 削除完了	
	});
}

userSchema.methods.removeGroup = function(groupid){
	User.groups.remove({id:groupid}, function(err){
		// 削除完了
	});
}

exports.User = mongoose.model('User', userSchema);

//---------------group----------------
var groupSchema = mongoose.Schema({
	name : String,
	id : String,
	intro : String,
	master: String,
	member : [String],	
	flashcards : {name : String,
					id : String}
})

groupSchema.methods.addFlashcard = function(name , id){
	var data = {'name':name,'id':id};
	this.flashcards.push(data);
}

groupSchema.methods.addUser = function(name){
	this.member.push(name);
}

groupSchema.methods.removeUser = function(name){
	for(i = 0; i < this.member.length; i++){
		if(this.member[i] == name){
			this.member.splice(i,1);
		}
	}
}

exports.Group = mongoose.model('Group', groupSchema)

//-------------flashcard--------------
var flashcardSchema = mongoose.Schema({
	name : String,
	id : String,
	intro: String,
	master : String,
	group : [String],
	level : Number,
	update : Number,
	words : [{eng:String,
			jap:String}]
})

flashcardSchema.methods.addWord = function(eng,jap){
	var pair = {'eng':eng,'jap':jap};
	this.words.push(pair);
}

exports.Flashcard = mongoose.model('Flashcard', flashcardSchema)

//-------------dictionary------------
var dictionarySchema = mongoose.Schema({
	'eng': String,
	'jap': String
});

exports.Dictionary = mongoose.model('Dictionary', dictionarySchema);
