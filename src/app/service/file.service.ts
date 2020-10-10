import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConstants} from '../app-constants';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient
  ) {
  }

  uploadFile(file: File, directoryId: string): Observable<HttpEvent<{}>> {
    console.log('Execute request uploadFile');
    const params = new HttpParams().set('parentDirectoryId', directoryId);
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', AppConstants.FILE_API_V1, formdata, {
      params: params,
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
