import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequestService} from "./request.service";
import {Observable} from "rxjs";
import {Game} from "../model/game";
import {AppConstants} from "../app-constants";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
    private requestService: RequestService
  ) {
  }

  getAll(): Observable<Game[]> {
    const observable = this.http.get<Game[]>(AppConstants.GAMES_API, {});
    return this.requestService.prepareRequest(observable);
  }

  getById(id: string): Observable<Game> {
    const observable = this.http.get<Game[]>(AppConstants.GAMES_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }

  add(game: Game): Observable<any> {
    const observable = this.http.post<any>(AppConstants.GAMES_API, game);
    return this.requestService.prepareRequest(observable);
  }

  update(game: Game, id: string): Observable<any> {
    const observable = this.http.put<any>(AppConstants.GAMES_API + '/' + id, game);
    return this.requestService.prepareRequest(observable);
  }

  delete(id: string): Observable<any> {
    const observable = this.http.delete<any>(AppConstants.GAMES_API + '/' + id, {});
    return this.requestService.prepareRequest(observable);
  }
}
