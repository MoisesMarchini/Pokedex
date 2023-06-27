import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    PokemonDetailsComponent,
    SearchComponent
  ]
})
export class PagesModule { }
