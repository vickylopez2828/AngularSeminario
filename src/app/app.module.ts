import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modulos
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

//componentes
import { GameListComponent } from './components/game-list/game-list.component';
import { GameCartComponent } from './components/game-cart/game-cart.component';
import { GameHomeComponent } from './components/game-home/game-home.component';
import { GameOffersComponent } from './components/game-offers/game-offers.component';
import { StarComponent } from './components/star/star.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { GameComponent } from './components/game/game.component';
import { GameFormComponent } from './components/game-form/game-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameCartComponent,
    GameHomeComponent,
    GameOffersComponent,
    StarComponent,
    RegisterComponent,
    LoginComponent,
    AdminPanelComponent,
    MyGamesComponent,
    GameComponent,
    GameFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),

  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
