var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name : String,
    	pass : String,
	flashcard : [Number],
});

exports.User = mongoose.model('User', userSchema);

var groopSchema = mongoose.Schema({
	name : String,
    	intro : String,
    	member : [String],
    	pass : String,	
		entry_member : [String],
    	flashcard : [{name : String,
						id : Number,],
})

exports.Groop = mongoose.model('Groop', groopSchema)

var flashcardSchema = mongoose.Schema({
	id : Number,
	word : [{english : String},
    		{japanese : String},]
})

exports.Flashcard = mongoose.model('Flashcard', flashcardSchema)
