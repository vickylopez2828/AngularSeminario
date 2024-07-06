import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Game } from '../interfaces/Game'
//const URL = 'https://apimocha.com/mundogaming/api/games';
//const URL = 'https://api.mockfly.dev/mocks/78ee371a-2383-4426-9611-e05c5b026eef/games';
//const URL = 'http://localhost:3000/';
const URL = "http://localhost:3001/api/games";

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }
  //consumir api
  public getAll(): Observable<Game[]>{
    return this.http.get<Game[]>(URL);
  }

  public addGame(form: FormData): Observable<Game>{
    return this.http.post<Game>(URL, form);
  }

  public deleteGame(id: any):Observable<any>{
    return this.http.delete(`${URL}/${id}`);
  }
  public updateGame(id: any, form: FormData):Observable<any>{
    console.log("id", id, "data", form)
    return this.http.put(`${URL}/${id}`, form);
  }

}
