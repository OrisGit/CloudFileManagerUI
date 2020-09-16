import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  authenticated: boolean;
  user: User;

  constructor(
    private http: HttpClient
  ) {
    if(sessionStorage.getItem('user') != null) {
      this.authenticated = true;
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
  }

  startSession(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.authenticated = true;
  }

  endSession() {
    sessionStorage.removeItem('user');
    this.authenticated = false;
  }

  logout() {
    if(this.authenticated) {
      let url = 'http://localhost:8082/logout';
      const headers = new HttpHeaders(sessionStorage.getItem('basic') ?
        {
          authorization : this.user.token
        } : {});
      return this.http.post<HttpResponse<any>>(url, {headers: headers})
        .pipe(tap(() => this.endSession()));
    }
  }

  login(email: string, password: string): Observable<User> {
    let url = 'http://localhost:8082/login';
    const headers = new HttpHeaders(email && password ?
      {
        authorization : 'Basic ' + btoa(email + ':' + password)
      } : {});
    console.log("post will send");
    return this.http.post<User>(url, {headers: headers})
      .pipe(tap(data => this.startSession(data)));
  }

  register(name: string, email: string, password: string) {
    let url = 'http://localhost:8082/register';
    console.log("post will send");
    return this.http.post(url, { name, email, password });
  }
}
