import { Component, Input } from '@angular/core';
import { Game } from '../../interfaces/Game';
@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrl: './star.component.scss'
})
export class StarComponent {
@Input()
game: Game = {
  title: "",
  price_normal: 0,
  price_off: 0,
  description: "",
  gameImage: "",
  type: "",
  qualification: 0,
  bought: false
};

//setea calificacion segun id, segun estrella clickeada
changeQualification(event: any, game: Game): void {
  game.qualification = event.target.id;
}

//toggle de clases segun calificacion
//cuando hago click se detecta el cambio y el ngClass reevalua las clases css
getClassStar(rating: number, game: Game): string {
  if(game.qualification === undefined){
    return 'empty'
  }
  return game.qualification >= rating ? 'filled' : 'empty';
}

}
