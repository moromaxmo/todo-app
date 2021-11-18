var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb+srv://admin:admin@todo-app.buw1i.mongodb.net/todo-app?retryWrites=true&w=majority', ['users']);


// Get All users
router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

// Get Single user
router.get('/user/:id', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
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
        db.users.save(user, function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
});

// Delete user
router.delete('/user/:id', function(req, res, next){
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
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
        db.users.update({_id: mongojs.ObjectId(req.params.id)},upduser, {}, function(err, user){
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