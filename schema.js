var mongoose = require('mongoose');


//---------------user-----------------
var userSchema = mongoose.Schema({
	name : String,
    pass : String,
	flashcards : {id:Number,
				name:String},
	groops:{id:Number,
			name:String},
});

userSchema.methods.addFlashcard = function(newFlashcard){
	this.flashcards.push(newFlashcard);
}

userSchema.methods.addGroop = function(newGroop){
	this.groop.push(newGroop);
}

userSchema.methods.removeFlashcard = function(flashcardid){
	User.flashcards.remove({id:flashcardid},function(err){
		// 削除完了	
	});
}

userSchema.methods.removeGroop = function(groopid){
	User.groops.remove({id:groopid}, function(err){
		// 削除完了
	});
}

exports.User = mongoose.model('User', userSchema);

//---------------groop----------------
var groopSchema = mongoose.Schema({
	name : String,
	intro : String,
	master: String,
	member : [String],	
	flashcards : {name : String,
					id : Number},
})

groopSchema.methods.addFlashcard = function(name , id){
	var data = {'name':name,'id':id};
	this.flashcards.push(data);
}

exports.Groop = mongoose.model('Groop', groopSchema)

//-------------flashcard--------------
var flashcardSchema = mongoose.Schema({
	name : String,
	id : String,
	intro: String,
	master : String,
	groop : [Number],
	level : Number,
	update : Number,
	words : String,
})

//flashcardSchema.methods.addWord = function(eng,jap){
//	var pair = {'eng':eng,'jap':jap};
//	this.words.push(pair);
//}

flashcardSchema.methods.get = function(){

}

flashcardSchema.methods.defect = function(){
	
}

exports.Flashcard = mongoose.model('Flashcard', flashcardSchema)

//-------------dictionary------------
var dictionarySchema = mongoose.Schema({
	'eng': String,
	'jap': String,
});

exports.Dictionary = mongoose.model('Dictionary', dictionarySchema);
