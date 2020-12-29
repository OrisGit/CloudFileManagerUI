import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {SessionService} from './session.service';
import {AppConstants} from '../app-constants';
import {User} from '../model/user';
import {NotificationService} from './notification.service';
import {SpinnerOverlayService} from './spinner-overlay.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private session: SessionService,
              private notification: NotificationService,
              private spinner: SpinnerOverlayService) {
  }

  logout(): void {
    if (this.session.isLoggedIn) {
      this.session.endSession();
    }
  }

  login(name: string, password: string): Observable<User> {
    this.spinner.show('');
    const url = AppConstants.AUTH_API_V1 + '/login';
    const token = this.createToken(name, password);
    const headers = new HttpHeaders(name && password ?
      {
        authorization: token
      } : {});
    return this.http.get<User>(url, {headers})
      .pipe(tap(x => this.spinner.hide()))
      .pipe(tap(user => {
        this.session.startSession(user, token);
      }))
      .pipe(catchError(error => {
        this.spinner.hide();
        this.notification.showError(error.error.message, 'Login filed');
        return throwError('');
      }));
  }

  register(username: string, email: string, password: string): Observable<any> {
    this.spinner.show('');
    const url = AppConstants.AUTH_API_V1 + '/register';
    return this.http.post(url, {username, email, password})
      .pipe(tap(x => this.spinner.hide()))
      .pipe(catchError(error => {
        this.spinner.hide();
        this.notification.showError(error.error.message, 'Registration filed');
        return throwError('');
      }));
  }

  createToken(name: string, password: string): string {
    return 'Basic ' + btoa(name + ':' + password);
  }
}
