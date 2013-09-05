var express = require("express");
var app = express();
var User = require("./user");

app.configure(function(){
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function(){
	app.use(express.errorHandler({dumpExceptions : true, showStack : true}));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

app.get('/', function(req, res){
	// インスタンス生成
	var u = new User();
	u.name = 'hoge';
	u.age = '49';
	//保存
	u.save();

	console.log("test");

	// 読み出し & ブラウザへデータ送信
	User.find({}, function(err, items){
		// find()の結果をブラウザに出力
		res.send(JSON.stringify(items));
	});	
});

console.log('run server. port 3000...');
app.listen(3000);
