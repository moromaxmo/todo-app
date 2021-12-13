var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');

const taskSchema = new mongoose.Schema({
    title: String,
    isDone: Boolean,
    userID: String
  });

const tasks = mongoose.model('Task', taskSchema);

// Get All Tasks
router.get('/tasks', function(req, res, next){
    tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get Single Task
router.get('/task/:id', function(req, res, next){
    tasks.findOne({_id: req.params.id }, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save A Task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '') || !task.userID){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        var taskDoc = tasks(task);
        taskDoc.save((err,result) => {
            if(err){
                res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
    tasks.deleteOne({_id: req.params.id}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task
router.put('/task/:id', function(req, res, next){
    var paramTask = req.body;
    tasks.findOne({_id: req.params.id}, function(err, oldTask){
        if(err){
            res.send(err);
        }
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
            tasks.updateOne({_id : oldTask._id},newTask , {}, function f(err,result) {
                if (err){
                    res.sendStatus(500);
                }
            });
            res.json(newTask);
        } catch (error) {
            console.log(error);
        }
    });
});

module.exports = router;