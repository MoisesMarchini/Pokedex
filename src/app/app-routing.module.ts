import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pokemon/:id', component: PokemonDetailsComponent},
  {path: 'search/:type', component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
