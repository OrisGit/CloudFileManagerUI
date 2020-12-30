import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequestService} from "./request.service";
import {Observable} from "rxjs";
import {Genre} from "../model/Genre";
import {AppConstants} from "../app-constants";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(
    private http: HttpClient,
    private requestService: RequestService
  ) {
  }

  getAll(): Observable<Genre[]> {
    const observable = this.http.get<Genre[]>(AppConstants.GENRE_API, {});
    return this.requestService.prepareRequest(observable);
  }

  getByIds(ids: string[]): Observable<Genre[]> {
    const params = new HttpParams().set('uuids', ids.join(','));
    const observable = this.http.get<Genre[]>(AppConstants.GENRE_API, {params: params});
    return this.requestService.prepareRequest(observable);
  }

  getById(id: string): Observable<Genre> {
    const observable = this.http.get<Genre[]>(AppConstants.GENRE_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }

  add(genre: Genre): Observable<any> {
    const observable = this.http.post<any>(AppConstants.GENRE_API, genre);
    return this.requestService.prepareRequest(observable);
  }

  update(genre: Genre, id: string): Observable<any> {
    const observable = this.http.put<any>(AppConstants.GENRE_API + '/' + id, genre);
    return this.requestService.prepareRequest(observable);
  }

  delete(id: string): Observable<any> {
    const observable = this.http.delete<any>(AppConstants.GENRE_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }
}
