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
    const server_url  = process.env['server_url'] || 'http://localhost:3000';
    var url = server_url + '/api/user';
    axios.post(url, {
      username: user.username,
      password: user.password
    })
  }
  
}
