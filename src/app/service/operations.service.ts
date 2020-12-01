import {Injectable} from '@angular/core';
import {FileDTO} from '../model/fileDTO';
import {Directory} from '../model/directory';
import {Operands} from '../model/operands';
import {Observable, of, throwError} from 'rxjs';
import {AppConstants} from '../app-constants';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SpinnerOverlayService} from './spinner-overlay.service';
import {catchError, tap} from 'rxjs/operators';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(
    private http: HttpClient,
    private spinner: SpinnerOverlayService,
    private notification: NotificationService
  ) {
  }

  deleteOperation(filesIds: string[], directoriesIds: string[]): Observable<string> {
    this.spinner.show('');
    const operands = new Operands(filesIds, directoriesIds);
    console.log('Delete operation for: ' + JSON.stringify(operands));
    return this.http.post(AppConstants.OPERATIONS_API_V1 + '/remove', operands, {responseType: 'text'})
      .pipe(tap(x => this.spinner.hide()))
      .pipe(catchError(error => {
        this.spinner.hide();
        this.notification.showError(error.error.message, 'Failed to delete content');
        return throwError('');
      }));
  }

  copyOperation(filesIds: string[], directoriesIds: string[], targetDirectoryId: string): Observable<string> {
    this.spinner.show('');
    const operands = new Operands(filesIds, directoriesIds);
    const params = new HttpParams().set('targetDirectoryId', targetDirectoryId);
    console.log('Copy operation for: ' + JSON.stringify(operands));
    return this.http.post(AppConstants.OPERATIONS_API_V1 + '/copy', operands, {
      responseType: 'text',
      params: params
    }).pipe(tap(x => this.spinner.hide()))
      .pipe(catchError(error => {
        this.spinner.hide();
        this.notification.showError(error.error.message, 'Failed to copy content');
        return throwError('');
      }));
  }

  moveOperation(filesIds: string[], directoriesIds: string[], targetDirectoryId: string): Observable<string> {
    this.spinner.show('');
    const operands = new Operands(filesIds, directoriesIds);
    const params = new HttpParams().set('targetDirectoryId', targetDirectoryId);
    console.log('Move operation for: ' + JSON.stringify(operands));
    return this.http.post(AppConstants.OPERATIONS_API_V1 + '/move', operands, {
      responseType: 'text',
      params: params
    }).pipe(tap(x => this.spinner.hide()))
      .pipe(catchError(error => {
        this.spinner.hide();
        this.notification.showError(error.error.message, 'Failed to move content');
        return throwError('');
      }));
  }
}
