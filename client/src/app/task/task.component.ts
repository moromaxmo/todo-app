import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  myParam: string | undefined;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
      this.route.params.subscribe((params: Params) => this.myParam = params['userID']);
  }

  tasks = new Array();

  //Show Tasks
  getUserTasks(): any{
    this.tasks = [];
    axios.get('http://localhost:3000/api/tasks')
    .then( (response) => {
      // handle success
      for (var i = 0; i < response.data.length; i++){
        if(response.data[i]['userID'] == this.myParam){
          this.tasks.push(response.data[i]);
        }
      }
    })
    .catch( (error) => {
      // handle error
      console.log(error);
    });  
    return this.tasks;
  }
  //Save Task
  addNewTask(title:string, isDone: boolean){
    axios.post('http://localhost:3000/api/task', {
      title: title,
      isDone: isDone,
      userID: this.myParam
    })
    setTimeout( () => {
      this.getUserTasks()
  }, 200);
  }
  //Delete Task
  deleteTask(_id:String){
    var url = 'http://localhost:3000/api/task/'+_id;
    axios.delete(url);
    setTimeout( () => {
      this.getUserTasks()
  }, 200);
    
  }

  updateTask(Task : any){
    axios.put('http://localhost:3000/api/task', {
      title: Task.title,
      isDone: !Task.isDone,
      _id: Task._id
    })
    console.log("here")
    setTimeout( () => {
      this.getUserTasks()
  }, 200);
  }

  logout(){
    this.router.navigate(['/']);
  }
}
