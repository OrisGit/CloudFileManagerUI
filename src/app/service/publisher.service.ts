import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequestService} from "./request.service";
import {Observable} from "rxjs";
import {Publisher} from "../model/publisher";
import {AppConstants} from "../app-constants";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(
    private http: HttpClient,
    private requestService: RequestService
  ) {
  }

  getAll(): Observable<Publisher[]> {
    const observable = this.http.get<Publisher[]>(AppConstants.PUBLISHER_API, {});
    return this.requestService.prepareRequest(observable);
  }

  getByIds(ids: string[]): Observable<Publisher[]> {
    const params = new HttpParams().set('uuids', ids.join(','));
    const observable = this.http.get<Publisher[]>(AppConstants.PUBLISHER_API, {params: params});
    return this.requestService.prepareRequest(observable);
  }

  getById(id: string): Observable<Publisher> {
    const observable = this.http.get<Publisher[]>(AppConstants.PUBLISHER_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }

  add(publisher: Publisher): Observable<any> {
    const observable = this.http.post<any>(AppConstants.PUBLISHER_API, {publisher});
    return this.requestService.prepareRequest(observable);
  }

  update(publisher: Publisher, id: string): Observable<any> {
    const observable = this.http.put<any>(AppConstants.PUBLISHER_API + '/' + id, {publisher});
    return this.requestService.prepareRequest(observable);
  }

  delete(id: string): Observable<any> {
    const observable = this.http.delete<any>(AppConstants.PUBLISHER_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }
}
