import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/LoginRequest';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  url : String = "https://api-mundo-gaming.vercel.app/api/users";
  constructor(private http: HttpClient) {}

  //loguear en el server
  loginUser(credentials:LoginRequest): Observable<any>{
    const result = this.http.post(`${this.url}/login`, credentials);
    return result;
  }

  //registro de usuario
  registerUser(user:User): Observable<any>{
    return this.http.post(`${this.url}`, user);

  }
}
