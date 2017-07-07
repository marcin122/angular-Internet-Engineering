import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import {Author} from "./author";

@Injectable()
export class AuthorService {

  private headers: Headers;
  private options: RequestOptions;
  private baseUrl = 'http://restapp.dev/app_dev.php/';

  constructor(private http: Http, private authService: AuthService) {
    this.headers = new Headers({'Authorization': 'Bearer ' + this.authService.token,
                                  'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  getAll(): Observable<Author[]> {
    return this.http.get(this.baseUrl + 'author', this.options).map(
        (response) => response.json()
    );
  }

  get(id: string): Observable<Author> {
    return this.http.get(this.baseUrl + `author/${id}`, this.options).map(
        (response) => response.json()
    );
  }

  create(name: string): Observable<Author> {
    let data = JSON.stringify({name: name});
    return this.http.put(this.baseUrl + 'author/create', data, this.options).map(
        (response) => response.json()
    );
  }

  update(id: string, name: string): Observable<Author> {
    let data = JSON.stringify({name: name});
    return this.http.post(this.baseUrl + `author/update/${id}`, data, this.options).map(
        (response) => response.json()
    );
  }

  remove(id: string){
    return this.http.delete(this.baseUrl + `author/${id}`, this.options).map(
        (response) => response.json()
    );
  }
}
