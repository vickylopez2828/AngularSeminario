import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/User';
import { FormService } from '../../services/form.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginError: string = '';
 // currentUserData$: Observable<User>;
  //currentUserLoginOn$: Observable<boolean>;

  loginForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder,  
              private loginService: UserService,
              private formService: FormService){
  }

  ngOnInit(): void {
    //mantener los datos del form
    const savedFormData = this.formService.getLoginFormData();
    if (savedFormData) {
      this.loginForm.patchValue(savedFormData);
    }

    this.loginForm.valueChanges.subscribe(value => {
      this.formService.setLoginFormData(value);
    });
  }

  get email(){
    return this.loginForm.controls.email;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  login():void{
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest);
      this.loginForm.reset(); 
    }else{
      this.loginForm.markAllAsTouched();
      this.loginError = "Todos los campos son requeridos";
    }
  }

  // login():void{
  //   if(this.loginForm.valid){
  //     this.loginService.login(this.loginForm.value as LoginRequest);
  //     //this.loginForm.reset();
  //     // .subscribe({
  //     //   next: (userData) =>{
  //     //     console.log(userData);
  //     //       this.toastr.success("Has iniciado sesión", 'Sesión iniciada!');
  //     //       this.router.navigateByUrl('/games');
  //     //       this.loginForm.reset();
  //     //   },
  //     //   error : (e: HttpErrorResponse) =>{
  //     //     if(e.error.msg){
  //     //       this.toastr.error(e.error.msg, 'Error');
  //     //     } else {
  //     //       this.toastr.error("Ha ocurrido un error, comuniquese con el administrador", 'Error');
  //     //     }
  //     //   }, complete: () => {}
  //     // });
      
  //   }else{
  //     this.loginForm.markAllAsTouched();
  //     this.loginError = "Todos los campos son requeridos";
  //   }
  // }
 

}
