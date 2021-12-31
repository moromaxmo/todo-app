import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  found = true;
  loginUser(user: any){
    const server_url  = process.env['server_url'] || 'http://localhost:3000';
    var url = server_url + '/api/users';
    axios.get(url)
    .then( (response) => {
      // handle success
      for (var i = 0; i < response.data.length; i++){
        if(user.username == response.data[i]['username'] && user.password == response.data[i]['password']){
          const userID = response.data[i]['_id'];
          this.found = true;
          this.route.navigate(['./task/', userID]);
          break;
        }
      };
      this.found = false;
    })
    .catch( (error) => {
      // handle error
      console.log(error);
    });  
  }
}
