import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class AuthService {

  public token: String;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string){
    let credentials = JSON.stringify({ _username: username, _password: password });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let req = this.http.post('http://restapp.dev/app_dev.php/user/login_check', credentials, {headers: headers});

    return req.map(response => {
      let token = response.json() && response.json().token;
      if (token) {
        this.token = token;

        localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
      }
    });
  }

  logout(){
    this.token = null;
    localStorage.removeItem('currentUser');

  }
}
