import { Component, Input } from '@angular/core';
import { PokemonModel } from 'src/app/models/pokemon';

@Component({
  selector: 'app-moveset-table',
  templateUrl: './moveset-table.component.html',
  styleUrls: ['./moveset-table.component.scss']
})
export class MovesetTableComponent {
  @Input() pokemon?: PokemonModel;
}
