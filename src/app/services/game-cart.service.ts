import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../interfaces/Game';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GameDataService } from './game-data.service';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameCartService implements OnInit, OnDestroy {
 /*behavior subject:  mantiene el valor más reciente y lo emite 
  /a los nuevos suscriptores cuando se suscriben.
  */
  private _cartList: Game[] = [];
  cartList: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);

  private _totalCart: number = 0;
  totalCart: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private _games: Game[] = [];
  games: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);

  //los juegos comprados
  private _myGames: Game[] = [];
  myGames: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);

  private gamesCopy: Game[] = [];

  //private _search: string = "";
  search: BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  //guardo las suscripciones para luego desuscribirme
  private gameSubscription: Subscription;
  private gameCopySubscription: Subscription;
  //private myGamesSubscription: Subscription;

  private id: any;

  //esta bien inicializar los juegos aqui en el service y no en el game-list-component
  constructor(private gameDataService: GameDataService) {   
    this.gameSubscription = this.gameDataService.getAll().subscribe(games => {
      this._games = games;
      this.games.next(this._games);
    }); 
    
    this.gameCopySubscription = this.gameDataService.getAll().subscribe(games => this.gamesCopy = games);                                                           
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
    this.gameCopySubscription.unsubscribe();
  //  this.myGamesSubscription.unsubscribe();
  }
 

  finalToBuy(): void{
    this._cartList.forEach(e => {
      const gameIndex = this._games.findIndex(g => g.title === e.title);
      if (gameIndex !== -1) {
        this._games[gameIndex].bought = false;
        this._games[gameIndex].type = 'ya-es-tuyo';
        this._myGames.push(this._games[gameIndex]);
        this.myGames.next(this._myGames);
        this.games.next(this._games);// Emitir una copia de la lista actualizada?
      }
    });
    this._cartList = [];
    this.cartList.next(this._cartList);
    this._totalCart = 0;
    this.totalCart.next(this._totalCart);
  }

  removeToCart(game: Game){
    //
    this._cartList = this._cartList.filter(i => i.title != game.title);
    this.sumTotalCart();
    /*next: emite nuevo valor a todos los suscriptores del behavior subjects
    /todos los observadores recibiran el nuevo valor
    */
    this.cartList.next(this._cartList);
    //cambio estado a no comprado
    const gameIndex = this._games.findIndex(g => g.title === game.title);
    if (gameIndex !== -1) {
      this._games[gameIndex].bought = false;
      this.games.next(this._games); //Emitir una copia de la lista actualizada??
    }
  }

  addToCart(game: Game): void{
   let item: Game | undefined = this._cartList.find((v1) => v1.title == game.title);
    if(!item){
      this._cartList.push({... game});
    }
    this.sumTotalCart();
    game.bought = true;
    this.cartList.next(this._cartList) 
    console.log("cartlist",this._cartList);
  }
  sumTotalCart(): void{
    let price = 0;
    this._cartList.forEach(e => {
      if(e.type == 'gratis'){
        price+=0;
      } else if(e.type == 'off'){
        price+=e.price_off
      } else {
        price+=e.price_normal;
      }
    });
    this._totalCart = price;
    this.totalCart.next(this._totalCart);
  }
  //fn que filtra juegos segun busqueda x nombre
  filter(value: string){
    //filter: crea una nueva lista con los elem q pasan la prueba de la fn
    this._games = this.gamesCopy.filter(({title} : Game) => {
      //include:verifica si el título incluye el valor de busqueda, en minusculas ambos
      return title.toLowerCase().includes(value.toLowerCase());
    })
    this.games.next(this._games);
  }

  updateNewData(data: any){
    const { id, title, description, price_normal, price_off,
            bought, qualification, type, img} = data[1].game;
    const newGame: Game = { id, title, description, price_normal, price_off, 
                            bought,qualification, type, gameImage: img}                     
    this._games.push(newGame);
    this.games.next(this._games);
  }

  addGame(form: FormData): Observable<Game>{
    return this.gameDataService.addGame(form).pipe(
      tap((data: any) => {
        this.updateNewData(data);
      })
    );
  }

  deleteGame(id: any): Observable<any>{
    return this.gameDataService.deleteGame(id).pipe(
      tap((data: any) => {
        if(data.status == 200){
          //console.log(data, "delete")
          this._games = this._games.filter(game => game.id != (data.game.id));
          this.games.next([...this._games]);
        }
      })
    );
  }
  updateId(id: any){
    this.id = id;
  }
  updateGame(form: FormData):Observable<Game>{
    //buscar el juego y modifiacrlo segun el nuevo
    return this.gameDataService.updateGame(this.id, form).pipe(
      tap((data: any) => {
        this.updateNewData(data);
      })
    );
  }
}
