var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
mongoose.connect('mongodb://localhost/Omega-3-Studios');

var Applicant = mongoose.model('Applicant',{
	name: String,
	bio: String,
	skills: [String],
	years: Number,
	why: String
});

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	Applicant.find({}, function(err,applicants){
		if(err){
			console.log(err);
			res.send(500, "Error retrieving applicants");
			return;
		}
		res.render('applicants',{applicants: applicants})
	})
});

// creates and applicant
app.post('/applicant', function(req, res){
	
	console.log(req.body);
	
	var applier = new Applicant({name: req.body.name, bio: req.body.bio, skills: req.body.skills, years: req.body.years, why: req.body.why});
	
	applier.save(function(err, data){
		if(err){
			console.log(err);
			res.send(500, "Error creating a new applicant");
			return;
		}
		res.redirect('/success');
	});
});

app.get('/success', function(req,res){
	res.render('success');
})

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
