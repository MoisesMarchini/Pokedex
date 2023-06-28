import { Component, OnInit } from '@angular/core';
import { PokedexService } from './services/pokedex.service';
import { environment } from './helpers/environment';
import { RouteHistoryService } from './services/route-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Pokedex';
  loaded = false;

  constructor(
    private pokedexService: PokedexService,
    private routeHistory: RouteHistoryService
  ) {}

  ngOnInit() {
    this.pokedexService.getAllPokemonList().subscribe({
      next: (value) => {
        environment.pokemonList = value;
        this.loaded = true;
      }
    })
  }
}
