import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { StatusProgressbarComponent } from './status-progressbar/status-progressbar.component';
import { RouterModule } from '@angular/router';
import { MovesetComponent } from './moveset-table/moveset-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PokemonCardComponent,
    StatusProgressbarComponent,
    MovesetComponent
  ],
  exports: [
    PokemonCardComponent,
    StatusProgressbarComponent,
    MovesetComponent
  ]
})
export class ComponentsModule { }
