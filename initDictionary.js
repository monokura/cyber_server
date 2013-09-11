var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/ca_app');

var Schema = require("./Schema");

//var DicSchema = mongoose.Schema({
//	'eng': String,
//	'jap': String,
//});

var db = mongoose.connection;

var fs = require('fs'), 
	byline = require('byline');

var stream = fs.createReadStream('dictionaryUTF.txt');

var Dictionary = db.model("Dictionary");
// 全削除したのち再読み込み
Dictionary.remove({}, function(err){
	stream = byline.createStream(stream);
	stream.on('data', function(line) {
		var str = line.toString('utf-8', 0, line.length);
		var data = str.split("\t");
		var word = new dictionary({
			'eng':data[0],
			'jap':data[1],
		});
		word.save();
	});
});
