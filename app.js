var express = require('express');
var app = express();
var Book = require('./models').Book;
var path = require("path");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var port = 3000;
// models
var models = require("./models");

// routes
var books = require('./routes/books');

//Sync Database
models.sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// register routes
app.use('/books', books);

// index path
app.get('/', function(req, res){
    console.log('listening on port: '+port);
 res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.listen(port, function(){
    console.log('app listening on port: '+port);
});