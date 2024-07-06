import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginRequest } from '../../interfaces/LoginRequest';
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

}
