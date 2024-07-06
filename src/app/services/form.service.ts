import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';
import { Game } from '../interfaces/Game';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _formData: User = {email:'', password:''};
  formData: BehaviorSubject<User> = new BehaviorSubject<User>({email:'', password:''});

  private _formLoginData: LoginRequest = {email:'', password:''};
  formLoginData: BehaviorSubject<LoginRequest> = new BehaviorSubject<LoginRequest>({email:'', password:''});

 
  constructor() { }

  setRegistrationFormData(data: any) {
    this._formData = data;
    this.formData.next(data);
  }

  getRegistrationFormData() {
  //ver
    return this._formData;
  }

  setLoginFormData(data: any) {
    this._formLoginData = data;
    this.formLoginData.next(data);
  }

  getLoginFormData() {
    return this._formLoginData;
  }
  
  
}
