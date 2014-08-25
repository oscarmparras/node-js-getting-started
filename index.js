var express = require('express')
var app = express();
var cool = require('cool-ascii-faces');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env.MONGOHQ_URL);

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/helloworld', function(request, response) {
  response.json({ message: 'Hello World!', face: cool() });
})

app.get('/productcollection/all', function(request, response) {
  var products = db.get('productcollection');
  products.find({}, {}, function(error, docs){
  	response.send(docs);
  });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
