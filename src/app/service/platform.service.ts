import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequestService} from "./request.service";
import {Observable} from "rxjs";
import {Platform} from "../model/platform";
import {AppConstants} from "../app-constants";

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(
    private http: HttpClient,
    private requestService: RequestService
  ) {
  }

  getAll(): Observable<Platform[]> {
    const observable = this.http.get<Platform[]>(AppConstants.PLATFORM_API, {});
    return this.requestService.prepareRequest(observable);
  }

  getByIds(ids: string[]): Observable<Platform[]> {
    const params = new HttpParams().set('uuids', ids.join(','));
    const observable = this.http.get<Platform[]>(AppConstants.PLATFORM_API, {params: params});
    return this.requestService.prepareRequest(observable);
  }

  getById(id: string): Observable<Platform> {
    const observable = this.http.get<Platform[]>(AppConstants.PLATFORM_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }

  add(platform: Platform): Observable<any> {
    const observable = this.http.post<any>(AppConstants.PLATFORM_API, {platform});
    return this.requestService.prepareRequest(observable);
  }

  update(platform: Platform, id: string): Observable<any> {
    const observable = this.http.put<any>(AppConstants.PLATFORM_API + '/' + id, {platform});
    return this.requestService.prepareRequest(observable);
  }

  delete(id: string): Observable<any> {
    const observable = this.http.delete<any>(AppConstants.PLATFORM_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }

}
