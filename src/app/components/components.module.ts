import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { StatusProgressbarComponent } from './status-progressbar/status-progressbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PokemonCardComponent,
    StatusProgressbarComponent
  ],
  exports: [
    PokemonCardComponent,
    StatusProgressbarComponent
  ]
})
export class ComponentsModule { }
