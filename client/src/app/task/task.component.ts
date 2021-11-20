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
  tasks = new Array();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
      this.route.params.subscribe((params: Params) => this.myParam = params['userID']);
      
  }

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
      this.tasks.forEach(element => {
        element['isEdit'] = false;
      }); 
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

  editMode(Task : any){
    Task.isEdit = true;
  }

  //UPDATE TASK TITLE
  saveEditedTask(Task : any, title: any){
    Task.isEdit = true;
    var url = 'http://localhost:3000/api/task/'+Task._id;
    axios.put(url, {
      title: Task.title,
      isDone: Task.isDone
    })
    setTimeout( () => {
      this.getUserTasks()
  }, 200);
  }

  //Update task progress
  changeState(Task : any){
    var url = 'http://localhost:3000/api/task/'+Task._id;
    axios.put(url, {
      "isDone": !Task.isDone,
    })
    setTimeout( () => {
      this.getUserTasks()
  }, 200);
  }
  
  closeEditMode(Task:any){
    Task.isEdit = false;
  }

  //log out
  logout(){
    this.router.navigate(['/']);
  }
  
}
