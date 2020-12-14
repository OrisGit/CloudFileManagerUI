import {Injectable} from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly USER_KEY = 'user';
  private user: User = null;
  isLoggedIn = false;

  constructor() {
    if (sessionStorage.getItem(this.USER_KEY) != null) {
      this.isLoggedIn = true;
    }
  }

  startSession(user: User, token: string): void {
    user.token = token;
    console.log('Session started for: ' + JSON.stringify(user));
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.isLoggedIn = true;
  }

  endSession(): void {
    sessionStorage.removeItem(this.USER_KEY);
    this.user = null;
    this.isLoggedIn = false;
  }

  getToken(): string {
    console.log('Token: ' + this.getCurrentUser().token);
    return this.getCurrentUser().token;
  }

  getUserName(): string {
    return this.getCurrentUser().name;
  }

  getEmail(): string {
    return this.getCurrentUser().email;
  }

  getRootDirectoryId(): string {
    return this.getCurrentUser().rootDirectoryId;
  }

  getCurrentUser(): User {
    if (this.user === null) {
      this.user = JSON.parse(sessionStorage.getItem(this.USER_KEY));
    }
    console.log('Current user: ' + JSON.stringify(this.user));
    return this.user;
  }
}
