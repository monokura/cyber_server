var mongoose = require('mongoose');


//---------------user-----------------
var userSchema = mongoose.Schema({
	name : String,
    pass : String,
	flashcards : [{name:String,
					id:Number}],
	groop:[{name:String,
			id:Number}],
});

userSchema.methods.addFlashcard = function(newFlashcard){
	this.flashcards.push(newFlashcard);
}

exports.User = mongoose.model('User', userSchema);

//---------------groop----------------
var groopSchema = mongoose.Schema({
	id : Number,
	name : String,
	intro : String,
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
	id : Number,
	name : String,
	intro: String,
	master : String,
	words : {english : String,
    		japanese : String}
})

flashcardSchema.methods.addWord = function(eng,jap){
	var pair = {'english':eng,'japanese':jap};
	this.words.push(pair);
}
exports.Flashcard = mongoose.model('Flashcard', flashcardSchema)

//-------------dictionary------------
var dictionarySchema = mongoose.Schema({
	'eng': String,
	'jap': String,
});

exports.Dictionary = mongoose.model('Dictionary', dictionarySchema);
