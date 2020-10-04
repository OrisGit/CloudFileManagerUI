import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private session: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.session.isLoggedIn && req.url.indexOf('auth') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: this.session.getToken()
        })
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
