import { Component, Input } from '@angular/core';
import { Game } from '../../interfaces/Game';
import { GameCartService } from '../../services/game-cart.service';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {

  @Input()
  games$: Observable<Game[]> | undefined;


  constructor(private gameCartService: GameCartService, private loginService: UserService){
    this.games$ = gameCartService.games.asObservable();
  }

}
