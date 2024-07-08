import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Game } from '../interfaces/Game'

const URL = "https://api-mundo-gaming.vercel.app/api/games"

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }
  //consumir api
  public getAll(): Observable<Game[]>{
    return this.http.get<Game[]>(URL);
  }

}
