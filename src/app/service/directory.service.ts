import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Directory} from '../model/directory';
import {AppConstants} from '../app-constants';
import {Observable, of, throwError} from 'rxjs';
import {DirectoryContent} from '../model/directory-content';
import {SessionService} from './session.service';
import {SpinnerOverlayService} from './spinner-overlay.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(
    private http: HttpClient,
    private spinner: SpinnerOverlayService
  ) {
  }

  getDirectoryContent(directoryId: string): Observable<DirectoryContent> {
    this.spinner.show('');
    const url = this.createPath(directoryId);
    console.log('Execute request getDirectoryContent');
    return this.http.get<DirectoryContent>(url, {})
      .pipe(tap(x => this.spinner.hide()))
      .pipe(catchError(() => {this.spinner.hide(); return throwError(''); }));
  }

  createDirectory(parentId: string, name: string): Observable<Directory> {
    this.spinner.show('');
    const params = new HttpParams().set('parentId', parentId);
    return this.http.post<Directory>(AppConstants.DIRECTORY_TREE_API_V1, {name}, {params:params})
      .pipe(tap(x => this.spinner.hide()))
      .pipe(catchError(() => {this.spinner.hide(); return throwError(''); }));
  }

  updateDirectoryName(directory: Directory, newName: string): Observable<any> {
    this.spinner.show('');
    const url = this.createPath(directory.id);
    directory.name = newName;
    return this.http.put(url, directory)
      .pipe(tap(x => this.spinner.hide()))
      .pipe(catchError(() => {this.spinner.hide(); return throwError(''); }));
  }

  private createPath(directoryId: string): string {
    return AppConstants.DIRECTORY_TREE_API_V1 + '/' + directoryId;
  }
}
