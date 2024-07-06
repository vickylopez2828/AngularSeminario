import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';
import { User } from '../interfaces/User';
import { UserDataService } from './user-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url : String = 'http://localhost:3001/api/users';
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private http: HttpClient,
              private userDataService: UserDataService,
              private router: Router, 
              private toastr: ToastrService
  ) {}

  //loguear en el server
  login(credentials:LoginRequest){
    this.userDataService.loginUser(credentials as LoginRequest).subscribe({
      next: (userData) =>{
        this.currentUserLoginOn.next(true);
        this.currentUserData.next(userData.user.name);
        this.toastr.success("Has iniciado sesión", 'Sesión iniciada!');
        this.router.navigateByUrl('/games');
      },
      error : (e: HttpErrorResponse) =>{
        if(e.error.msg){
          this.toastr.error(e.error.msg, 'Error');
        } else {
          this.toastr.error("Ha ocurrido un error, comuniquese con el administrador", 'Error');
        }
      }, complete: () => {}
    });
  }

  closeSession(){
    this.currentUserLoginOn.next(false);
  }

  //registro de usuario
  registerUser(user:User): Observable<any>{
    return this.userDataService.registerUser(user);
  }

}
