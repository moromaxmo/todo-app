var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var ip = process.env.DB_IP || 'localhost';

var port = 27017;
var dbUri = 'mongodb://'+ip+':' + port + '/todo-app'
var db = mongoose.connect( dbUri, function(err, response){
    console.log('db url: '+dbUri);
    if(err) console.log("Cannot connect to db");
    else console.log("Connected to db on port "+port + ", with ip " + ip)
});

router.get('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;