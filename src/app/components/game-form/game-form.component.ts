import { Component, OnInit } from '@angular/core';
import { Game } from '../../interfaces/Game';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { GameCartService } from '../../services/game-cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.scss'
})
export class GameFormComponent implements OnInit{
  modifyOn$: Observable<boolean>;
  registerError: String = '';
  imgDefault: string = "../../../assets/image/home/noimage.jpg";
  imgData: string = '';
  file: any;
  game: Game = {
    title: "Título",
    price_normal: 0,
    price_off: 0,
    description: "Descripción",
    gameImage: this.imgDefault,
    type: "nuevo",
    qualification: 0,
    bought: false
  };
  gameForm = this.formBuilder.group({
    title:['', [Validators.required]],
    price_normal:[0, [ Validators.min(0)]],
    price_off:[0, [ Validators.min(0)]],
    description:['', [Validators.required]],
    type:['', [Validators.required]],
    gameImage:[this.imgDefault, [Validators.required]],
    bought:[false, [Validators.required]],
    qualification:[0, [Validators.required, Validators.min(0), Validators.max(5)]]
  })

  constructor(private formBuilder: FormBuilder, 
              private formService: FormService,
              private gameService: GameCartService,
              private toastr: ToastrService,
              private router: Router){
    this.modifyOn$ = this.formService.modifyOn.asObservable();
  }

  ngOnInit(): void {
    //mantener los datos del form
    const savedFormData = this.formService.getGameFormData();
    
    if (savedFormData) {
      this.game = savedFormData;//
      this.gameForm.patchValue(savedFormData);
    }

    this.gameForm.valueChanges.subscribe(value => {
      this.formService.setGameFormData(value);
      this.game = this.formService.getGameFormData();
    });

  }

  get title(){
    return this.gameForm.controls.title;
  }
  get description(){
    return this.gameForm.controls.description;
  }
  get price(){
    return this.gameForm.controls.price_normal;
  }
  get priceOff(){
    return this.gameForm.controls.price_off;
  }

  get gameImage(){
    return this.gameForm.controls.gameImage;
  }
  get bought(){
    return this.gameForm.controls.bought;
  }
  get qualification(){
    return this.gameForm.controls.qualification;
  }
  
  clear(){
    this.gameForm.reset();
    this.game = {
      title: "Título",
      price_normal: 0,
      price_off: 0,
      description: "Descripción",
      gameImage: this.imgDefault,
      type: "nuevo",
      qualification: 0,
      bought: false
    }
  }

 
  onChange(event: any){
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.imgData = this.file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.game.gameImage = e.target.result;
        this.gameForm.patchValue({ gameImage: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  updateGame(){
    if(this.gameForm.valid){
      const form = new FormData();
      form.append("title", `${this.gameForm.value.title}`);
        form.append("price_normal", `${this.gameForm.value.price_normal}`);
        form.append("price_off", `${this.gameForm.value.price_off}`);
        form.append("description", `${this.gameForm.value.description}`);
        form.append("type", `${this.gameForm.value.type}`);
      
      if (this.file) {
        form.append('gameImage', this.file, this.file.name);
      } else {
        // Si no se cambió la imagen, enviar la imagen actual
        form.append('gameImage', this.game.gameImage);
      }
      form.append("bought", this.gameForm.value.bought ? "1" : "0");
      form.append("qualification", `${this.gameForm.value.qualification}`);
  
      this.gameService.updateGame(form).subscribe({
        next: (userData) => {
          this.toastr.success('Juego actualizado con éxito');
          this.router.navigateByUrl('/admin');
          this.gameForm.reset();
          this.game.gameImage = this.imgDefault;
        },
        error: (e: HttpErrorResponse) => {
          if (e.error.msg) {
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error("Ha ocurrido un error, comuníquese con el administrador", 'Error');
          }
        }
      });
    } else {
      this.gameForm.markAllAsTouched();
      this.registerError = "Todos los campos son requeridos";
    }
  }

  addGame(): void{  
      if(this.gameForm.valid){
        const form = new FormData();
        form.append("title", `${this.gameForm.value.title}`);
        form.append("price_normal", `${this.gameForm.value.price_normal}`);
        form.append("price_off", `${this.gameForm.value.price_off}`);
        form.append("description", `${this.gameForm.value.description}`);
        //form.append('gameImage', this.file, this.file.name);
        form.append("type", `${this.gameForm.value.type}`);
        form.append("bought", this.gameForm.value.bought ? "1" : "0");
        // if(this.gameForm.value.bought === true){
        //   form.append("bought", "1");
        // } else{
        //   form.append("bought", "0");
        // }
        form.append("qualification", `${this.gameForm.value.qualification}`);
        if (this.file) {
          form.append('gameImage', this.file, this.file.name);
        } else {
          // Si no se cambió la imagen, enviar la imagen actual
          form.append('gameImage', this.game.gameImage);
        }
        this.gameService.addGame(form).subscribe({
          next: (userData) =>{
              this.toastr.success('','Juego procesado con éxito');
              this.router.navigateByUrl('/admin');
              this.gameForm.reset();
              this.game.gameImage = this.imgDefault;
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
        this.gameForm.markAllAsTouched();
        this.registerError = "Todos los campos son requeridos";
      }
  }
}

