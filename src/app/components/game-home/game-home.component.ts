import { Component, OnInit } from '@angular/core';
import { GameCartService } from '../../services/game-cart.service';
import { Observable, map } from 'rxjs';
import { Game } from '../../interfaces/Game';

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrl: './game-home.component.scss'
})
export class GameHomeComponent implements OnInit {
  
  allGames$: Observable<Game[]>;
  cartList$: Observable<Game[]>;
  cartListIsEmpty$?: Observable<boolean>;
  constructor(private gameService: GameCartService){
    //convierte el subject en observable de solo lectura
    this.cartList$ = gameService.cartList.asObservable();
    this.allGames$ = gameService.games.asObservable();
  }
  ngOnInit() {
    // Verifica si el carrito esta vacio, si esta vacio retorna true
    //pipe: metodo de los observables para encadenar operadores
    this.cartListIsEmpty$ = this.cartList$.pipe(
      map((games : Game[]) => games.length === 0)
    );
  }
}
