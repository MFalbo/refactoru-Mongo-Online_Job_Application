var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.render('applicants')
});

// creates and applicant
app.post('/applicant', function(req, res){
	console.log(req.body);
	res.send('Success!');
});

app.get('/success', function(req,res){
	res.render('success');
})

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});