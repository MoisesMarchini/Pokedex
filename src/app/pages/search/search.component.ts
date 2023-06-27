import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/helpers/environment';
import { PokemonList } from 'src/app/models/pokemonList';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  type?: string;
  subscription?: Subscription;

  private _pokemonList: PokemonList[] = [];
  get pokemonList() {
    return this._pokemonList.filter(p=>p.name.toLowerCase().includes(environment.searchText.toLowerCase()));
  }

  constructor(
    private pokedexService: PokedexService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (!this.activatedRoute.snapshot.params['type']) {
      this.router.navigateByUrl('/');
      return;
    }

    this.subscription =
      this.activatedRoute.params.subscribe(
        (params: any) => {
          if (!params['type']){
            this.router.navigateByUrl('/');
            return;
          }

          this.type = params['type'];
          this.loadList();
        }
      )
  }

  loadList() {
    this.pokedexService.getByType(this.type!).subscribe({
      next: (value) => {
        this._pokemonList = value;
      }
    })
  }
}
