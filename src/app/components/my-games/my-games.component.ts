import { Component } from '@angular/core';
import { GameCartService } from '../../services/game-cart.service';
import { Observable } from 'rxjs';
import { Game } from '../../interfaces/Game';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.scss'
})
export class MyGamesComponent {
  allGames$: Observable<Game[]>;
  
  constructor(private gameService: GameCartService){
    this.allGames$ = this.gameService.myGames.asObservable();
  }
 
}
