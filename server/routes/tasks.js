var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb+srv://admin:admin@todo-app.buw1i.mongodb.net/todo-app?retryWrites=true&w=majority', ['tasks']);
var cors = require('cors');

// Get All Tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
        //res.render('tasks.html',tasks);
    });
});

// Get Single Task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '') || !task.userID){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task
router.put('/task/:id', function(req, res, next){
    var paramTask = req.body;

    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, oldTask){
        if(err){
            res.send(err);
        }
        //res.json(task_found);
        if(!req.body.title){
            paramTask.title = oldTask.title;
        }
        if(req.body.isDone === ""){
            paramTask.isDone = oldTask.isDone;
        }
        newTask = {
            '_id': oldTask._id,
            'title': paramTask.title,
            'isDone': paramTask.isDone,
            'userID': oldTask.userID
        }
        try {
            db.tasks.replaceOne(oldTask,newTask);
            res.json(newTask);
        } catch (error) {
            console.log(error);
        }
    });
});


module.exports = router;