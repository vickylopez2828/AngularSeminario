import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameHomeComponent } from './components/game-home/game-home.component';
import { GameOffersComponent } from './components/game-offers/game-offers.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { GameFormComponent } from './components/game-form/game-form.component';

const routes: Routes = [
  {path:'', redirectTo: 'games', pathMatch: 'full'},
  {path:'games', component: GameHomeComponent},
  {path:'offers', component: GameOffersComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'admin', component: AdminPanelComponent},
  {path:'myGames', component: MyGamesComponent},
  {path:'gameForm', component: GameFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
