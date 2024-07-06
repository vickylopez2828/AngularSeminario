import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';
import { Game } from '../interfaces/Game';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private imgDefault: string = "../../../assets/image/home/noimage.jpg";
  private _modifyOn: boolean = false;
  
  modifyOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _formData: User = {email:'', password:''};
  formData: BehaviorSubject<User> = new BehaviorSubject<User>({email:'', password:''});

  private _formLoginData: LoginRequest = {email:'', password:''};
  formLoginData: BehaviorSubject<LoginRequest> = new BehaviorSubject<LoginRequest>({email:'', password:''});

  private _formGameData: Game = {title:'', price_normal:0, 
                                 price_off: 0, description:'',
                                 type:'', gameImage: this.imgDefault, bought: false,
                                 qualification:0 };
  formGameData: BehaviorSubject<Game> = new BehaviorSubject<Game>({title:'', price_normal:0, 
                                                                   price_off: 0, description:'',
                                                                   type:'', gameImage: this.imgDefault, bought: false,
                                                                   qualification:0 });

  constructor() { }

  setModifyOn(value: boolean){
    this._modifyOn = value;
    this.modifyOn.next(this._modifyOn);
   // console.log(this.modifyOn)
  }

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

  setGameFormData(data: any) {
    //console.log(data, "data")
    this._formGameData = data;
    this.formGameData.next(data);
  }

  getGameFormData() {
    return this._formGameData;
  }

  
  
}
