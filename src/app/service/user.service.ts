import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {SessionService} from './session.service';
import {AppConstants} from '../app-constants';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private session: SessionService) {
  }

  logout(): void {
    if (this.session.isLoggedIn) {
      this.session.endSession();
    }
  }

  login(name: string, password: string): Observable<User> {
    const url = AppConstants.AUTH_API_V1 + '/login';
    const token = this.createToken(name, password);
    const headers = new HttpHeaders(name && password ?
      {
        authorization: token
      } : {});
    return this.http.get<User>(url, {headers})
      .pipe(tap(user => this.session.startSession(user, token)));
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url = AppConstants.AUTH_API_V1 + '/register';
    return this.http.post(url, {username, email, password});
  }

  createToken(name: string, password: string): string {
    return 'Basic ' + btoa(name + ':' + password);
  }
}
