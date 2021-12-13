var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var port = 27017;
var dbUri = 'mongodb://localhost:' + port + '/todo-app'
var db = mongoose.connect( dbUri, function(err, response){
    if(err) console.log("Cannot connect to db");
    else console.log("Connected to db on port "+port)
});

router.get('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;