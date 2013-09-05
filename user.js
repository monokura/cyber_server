var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/test');

function validator(v){
	return v.length > 0;
}

var User = new mongoose.Schema({
	name	: {type: String, validate:[validator, "Empty Error"] },
	age		: {type: String, validate:[validator, "Emoty erroe"] },
	created : {type: Date, default: Date.now}
});

module.exports = db.model('user', User);
