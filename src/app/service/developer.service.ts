import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../app-constants";
import {Developer} from "../model/developer";
import {RequestService} from "./request.service";

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {


  constructor(
    private http: HttpClient,
    private requestService: RequestService
  ) {
  }

  getAll(): Observable<Developer[]> {
    const observable = this.http.get<Developer[]>(AppConstants.DEVELOPERS_API, {});
    return this.requestService.prepareRequest(observable);
  }

  getByIds(ids: string[]): Observable<Developer[]> {
    const params = new HttpParams().set('uuids', ids.join(','));
    const observable = this.http.get<Developer[]>(AppConstants.DEVELOPERS_API, {params: params});
    return this.requestService.prepareRequest(observable);
  }

  getById(id: string): Observable<Developer> {
    const observable = this.http.get<Developer[]>(AppConstants.DEVELOPERS_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }

  add(developer: Developer): Observable<any> {
    const observable = this.http.post<any>(AppConstants.DEVELOPERS_API, developer);
    return this.requestService.prepareRequest(observable);
  }

  update(developer: Developer, id: string): Observable<any> {
    const observable = this.http.put<any>(AppConstants.DEVELOPERS_API + '/' + id, developer);
    return this.requestService.prepareRequest(observable);
  }

  delete(id: string): Observable<any> {
    const observable = this.http.delete<any>(AppConstants.DEVELOPERS_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }
}
