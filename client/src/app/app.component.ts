import { Component } from '@angular/core';
import axios from 'axios';
import { range } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  static api_endpoint = 'api/';
  static server_url = 'http://server-moromaxmo-dev.apps.sandbox.x8i5.p1.openshiftapps.com/' + AppComponent.api_endpoint;
}
