import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  server_url = AppComponent.server_url;
  constructor() { }

  ngOnInit(): void {
  }


  registerUser(user: any){
    const endpoint = 'user';
    const url = this.server_url+endpoint;
    axios.post(url, {
      username: user.username,
      password: user.password
    })
    console.log('User registered successfully')
  }
  
}
