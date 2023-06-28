import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { StatusProgressbarComponent } from './status-progressbar/status-progressbar.component';
import { RouterModule } from '@angular/router';
import { MovesetTableModule } from './moveset-table/moveset-table.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MovesetTableModule
  ],
  declarations: [
    PokemonCardComponent,
    StatusProgressbarComponent,
  ],
  exports: [
    PokemonCardComponent,
    StatusProgressbarComponent,
    MovesetTableModule
  ]
})
export class ComponentsModule { }
