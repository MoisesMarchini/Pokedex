import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovesetTableComponent } from './moveset-table.component';
import { MovesetRowComponent } from './moveset-row/moveset-row.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MovesetTableComponent,
    MovesetRowComponent
  ],
  exports: [
    MovesetTableComponent,
    MovesetRowComponent
  ]
})
export class MovesetTableModule { }
