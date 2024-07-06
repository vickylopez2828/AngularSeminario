import { Component, Input } from '@angular/core';
import { Game } from '../../interfaces/Game';
import { GameCartService } from '../../services/game-cart.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

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
  constructor(private gameCartService: GameCartService){
  }


  addCart(game: Game){
    this.gameCartService.addToCart(game);
  }
  //cambia clase del boton comprar(carrito)
  //si esta comprado lo deshabilita
  getClassCart(game: Game){
    let rdo:{} = {'card-btn-buy': true};
    if(game.bought){
      rdo = {
        'card-btn-buy': false,
        'card-btn-buy-bought': true,
      } 
    } 
    return rdo;
  }

  //retorna la clase de card, segun tipo
  getClass(game: Game):{} {
    return {
      'card': true,
      'tag': true,
      [game.type]: true
    };
  }
}
