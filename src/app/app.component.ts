import { Component, OnInit } from '@angular/core';
import { PokedexService } from './services/pokedex.service';
import { environment } from './helpers/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Pokedex';

  constructor(
    private pokedexService: PokedexService
  ) {}

  ngOnInit(): void {
    this.pokedexService.getMany().subscribe({
      next: (value) => {
        environment.pokemonList = value;
      }
    })
  }
}
