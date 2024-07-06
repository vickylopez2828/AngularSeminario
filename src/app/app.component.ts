import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameCartService } from './services/game-cart.service';
import { UserService } from './services/user.service';
import { User } from './interfaces/User';
import { LoginRequest } from './interfaces/LoginRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  userLoginOn$: Observable<boolean>;
  //nombre de usuario
  userData$: Observable<String>;
 //rol de usuario
  userRole$: Observable<String>;

  //userData: LoginRequest = {email:'', password: ''}
  open: boolean = false;
  
  constructor(private gameService: GameCartService,private loginService: UserService){
    this.userLoginOn$ = this.loginService.currentUserLoginOn.asObservable();
    this.userData$ = this.loginService.currentUserData.asObservable();
    this.userRole$ = this.loginService.currentUserRole.asObservable();
  }
  
  closeSession(){
    //this.userLoginOn = false;
    this.loginService.closeSession();
  }
  filter(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const search: string = inputElement.value;
    this.gameService.filter(search);
  }

  toggleClass(){
    this.open = !this.open;
  }

  getClassMenu(): {}{
    let rdo:{} = {'menu-user': true};
      if(this.open){
      rdo = {
        'menu-user': true,
        'open': true,
      } 
    } 
    return rdo;
  }

}
