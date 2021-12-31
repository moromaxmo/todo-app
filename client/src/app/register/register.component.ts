import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  registerUser(user: any){
    axios.post('http://localhost:3000/api/user', {
      username: user.username,
      password: user.password
    })
  }
  
}
