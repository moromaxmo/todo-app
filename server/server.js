var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var cors = require('cors');
const cors=require("cors");


var index = require('./routes/index');
var tasks = require('./routes/tasks');
var users = require('./routes/users');

var port = 3000;

var app = express();
//app.use(cors());

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);
app.use('/api', users)

app.listen(port, function(){
    console.log('Server started on port '+port);
});