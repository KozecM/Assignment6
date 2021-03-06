var http = require('http');
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/post_get', function(req, res){
  var stuff = []
  var type = {};
  type.status = "GET";
  for (var f in req.query){
    stuff.push({'name': f, 'value':req.query[f]});
  }
  type.Listdata = stuff;
  res.render('post_get', type);
});

app.post('/post_get', function(req, res){
  var things = [];
  var container = {};
  container.status = "POST"
  for(var f in req.body){
    things.push({'name': f, 'value':req.body[f]})
  }
  console.log(req.body);
  container.Listdata = things;
  res.render('post_get', container);
})

app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
