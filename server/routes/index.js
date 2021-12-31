var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var ip = process.env.DB_IP || 'localhost';
var username = process.env.DB_username || 'admin';
var password = process.env.DB_password || 'admin';
var port = process.env.DB_port || '27017';
var dbname = process.env.dbname || 'todo-app';

const dbUri1 = 'mongodb://'  + username + ':' + password + '@' + ip +  ':' + port + '/' + dbname;

const dbUri2 = 'mongodb://'+ip+':' + port + '/todo-app';

var db = mongoose.connect( dbUri1, function(err, response){
    console.log('db url: '+dbUri1);
    if(err) console.log("Cannot connect to db");
    else console.log("Connected to db on port "+port + ", with ip " + ip)
});

router.get('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;