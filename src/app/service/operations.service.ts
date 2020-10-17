import {Injectable} from '@angular/core';
import {FileDTO} from "../model/fileDTO";
import {Directory} from "../model/directory";
import {Operands} from "../model/operands";
import {Observable} from "rxjs";
import {AppConstants} from "../app-constants";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(
    private http: HttpClient
  ) {
  }

  deleteOperation(filesIds: string[], directoriesIds: string[]): Observable<string> {
    const operands = new Operands(filesIds, directoriesIds);
    console.log('Delete operation for: ' + JSON.stringify(operands));
    return this.http.post(AppConstants.OPERATIONS_API_V1 + '/remove', operands, {responseType: 'text'});
  }

  copyOperation(filesIds: string[], directoriesIds: string[], targetDirectoryId: string): Observable<string> {
    const operands = new Operands(filesIds, directoriesIds);
    const params = new HttpParams().set('targetDirectoryId', targetDirectoryId);
    console.log('Copy operation for: ' + JSON.stringify(operands));
    return this.http.post(AppConstants.OPERATIONS_API_V1 + '/copy', operands, {responseType: 'text', params: params});
  }

  moveOperation(filesIds: string[], directoriesIds: string[], targetDirectoryId: string): Observable<string> {
    const operands = new Operands(filesIds, directoriesIds);
    const params = new HttpParams().set('targetDirectoryId', targetDirectoryId);
    console.log('Move operation for: ' + JSON.stringify(operands));
    return this.http.post(AppConstants.OPERATIONS_API_V1 + '/move', operands, {responseType: 'text', params: params});
  }
}
