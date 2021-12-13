var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var db = mongoose.connect('mongodb://localhost:27017/todo-app' , function(err, response){
    if(err) console.log("Cannot connect to db");
    console.log("Connected to db")
});

router.get('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;