import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswords } from './register.validator';
import { User } from '../../interfaces/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormService } from '../../services/form.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  
  registerError: String = '';

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
    confirmPassword: ['', Validators.required]
  },{
    validators: checkPasswords
  })
  constructor(private formBuilder: FormBuilder, 
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private formService: FormService
              ){}

  
  ngOnInit(): void {
    //mantener los datos del form
    const savedFormData = this.formService.getRegistrationFormData();
    if (savedFormData) {
      this.registerForm.patchValue(savedFormData);
    }

    this.registerForm.valueChanges.subscribe(value => {
      this.formService.setRegistrationFormData(value);
    });
  }

  get name(){
    return this.registerForm.controls.name;
  }

  get lastname(){
    return this.registerForm.controls.lastname;
  }

  get email(){
    return this.registerForm.controls.email;
  }
  get password(){
    return this.registerForm.controls.password;
  }
  get confirmPassword(){
    return this.registerForm.controls.confirmPassword;
  }

  checkEqualsPasswords(): boolean | undefined{
    //(!!) convierte cualquier valor falsy en false (incluso undefined)
    return !!(this.registerForm.hasError('passwordsNotEquals')) &&
      this.registerForm.get('password')?.dirty &&
      this.registerForm.get('confirmPassword')?.dirty
  }
  register():void{
    if(this.registerForm.valid){
      this.userService.registerUser(this.registerForm.value as User)
      .subscribe({
        next: (userData) =>{
            this.toastr.success('','Usuario registrado con éxito');
            this.router.navigateByUrl('/login');
            this.registerForm.reset();
        },
        error : (e: HttpErrorResponse) =>{
          if(e.error.msg){
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error("Ha ocurrido un error, comuniquese con el administrador", 'Error');
          }
        }, complete: () => {}
      });
    } else{
      this.registerForm.markAllAsTouched();
      this.registerError = "Todos los campos son requeridos";
    }
  }
}
