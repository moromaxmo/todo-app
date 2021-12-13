var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });

const users = mongoose.model('User', userSchema);

// Get All users
router.get('/users', function(req, res, next){
    users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

// Get Single user
router.get('/user/:id', function(req, res, next){
    users.findOne({_id: req.params.id}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

//Save user
router.post('/user', function(req, res, next){
    var user = req.body;
    if(!user.username || !user.password){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        var userDoc = users(user);
        userDoc.save((err,result) => {
            if(err){
                res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    }
});

// Delete user
router.delete('/user/:id', function(req, res, next){
    users.deleteOne({_id: req.params.id}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

// Update user
router.put('/user/:id', function(req, res, next){
    var user = req.body;
    var upduser = {};
    
    if(user.password){
        upduser.password = user.password;
    }
    
    if(user.username){
        upduser.username = user.username;
    }
    
    if(!upduser){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        users.updateOne({_id: req.params.id},upduser, {}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
    }
});

/*
function userNameExists(user){
    if(db.users.findOne({username: user})){
        return true;
    }
    return false;
};
*/

module.exports = router;