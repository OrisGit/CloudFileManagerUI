import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {SpinnerOverlayService} from "./spinner-overlay.service";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private spinner: SpinnerOverlayService,
    private notification: NotificationService) {
  }

  prepareRequest(request: Observable<any>): Observable<any> {
    this.spinner.show('');
    return request
      .pipe(tap(x => this.spinner.hide()))
      .pipe(catchError(error => {
        this.spinner.hide();
        this.notification.showError(error.error.message, 'Failed to update folder name');
        return throwError('');
      }));
  }
}
