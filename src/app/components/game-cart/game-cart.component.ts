import { Component } from '@angular/core';
import { Game } from '../../interfaces/Game';
import { GameCartService } from '../../services/game-cart.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-game-cart',
  templateUrl: './game-cart.component.html',
  styleUrl: './game-cart.component.scss'
})
export class GameCartComponent {
  //en el template "me suscribo"
  cartList$: Observable<Game[]>;
  totalCart$: Observable<number>;
  isPopupOpen: boolean = false;
  cartListIsEmpty$?: Observable<boolean>;

  constructor(private gameService: GameCartService){
    //convierte el subject en observable de solo lectura
    this.cartList$ = gameService.cartList.asObservable();
    this.totalCart$ = gameService.totalCart.asObservable();
  }
  ngOnInit() {
    // Verifica si el carrito esta vacio, si esta vacio retorna true
    //pipe: metodo de los observables para encadenar operadores
    this.cartListIsEmpty$ = this.cartList$.pipe(
      map((games : Game[]) => games.length === 0)
    );
  }

  
  removeCart(game: Game): void{
    this.gameService.removeToCart(game);
  }
 
  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
  }

  getClass(value: boolean):{}{
    return {
      'popup': true,
      'close': value,
    };
  }

  finalBuy(): void{
    this.gameService.finalToBuy();
    this.togglePopup();
  }
 

}
