import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../interfaces/Game';
import { GameCartService } from '../../services/game-cart.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { FormService } from '../../services/form.service';




@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  games$: Observable<Game[]>;
 

  constructor(private gameCartService: GameCartService, 
              private formService: FormService){
    this.games$ = this.gameCartService.games.asObservable();
  }

  deleteGame(id: any){
    Swal.fire({
      title: "Estas seguro?",
      text: "Si borras el juego, se eliminará definitivamente!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        this.gameCartService.deleteGame(id).subscribe({
          next: (data) =>{
                Swal.fire({
                  title: "Borrado!",
                  text: `${data.game.title}  ha sido borrado.`,
                  icon: "success"
                });
          },
          error : (e: HttpErrorResponse) =>{
            if(e.error.msg){
              Swal.fire({
                title: "Error!",
                text: e.error.msg,
                icon: "warning"
              });
            } else {
              Swal.fire({
                title: "Atención!",
                text: "Ha ocurrido un error, comuniquese con el administrador",
                icon: "warning"
              });
            }
          }, complete: () => {}
        });      
      }
    });
  };

  updateGame(game: Game){
    
    this.gameCartService.updateId(game.id);
    this.formService.setGameFormData(game);
    this.formService.setModifyOn(true);
   
  };
  
  agregar(){
    this.formService.setModifyOn(false);
  }

}
