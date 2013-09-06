var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name : String,
    	pass : String,
	flashcard : [Number],
});

exports.User = mongoose.model('User', userSchema);

var groopScema = mongoose.Schema({
	name : String,
    	intro : String,
    	menber : [String],
    	entry_menber : [String],
    	flashcard : [Number],
})

exports.Groop = mongoose.model('Groop', groopSchema)

var flashcardSchema = mongoose.Schema({
	id : Number
	word : [{English : String},
    		{Japanese : String},]
})

exports.Flashcard = mongoose.model('Flashcard', flashcardScema)
