import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/helpers/environment';
import { NameUrl } from 'src/app/models/NameUrl';
import { PokemonModel } from 'src/app/models/pokemon';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  id: string = '25';
  subscription?: Subscription;
  pokemon?: PokemonModel;

  tabs = ['Base Status', 'Moveset']
  currentTabIndex = 0;

  constructor(
    private pokedexService: PokedexService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    environment.hideSearchBar = true;
    if (!this.activatedRoute.snapshot.params['id']) {
      this.router.navigateByUrl('/');
      return;
    }

    this.subscription =
      this.activatedRoute.params.subscribe(
        (params: any) => {
          if (!params['id']){
            this.router.navigateByUrl('/');
            return;
          }

          this.id = params['id'];
          this.loadPokemon();
        }
      )
  }

  ngOnDestroy() {
    environment.hideSearchBar = false;
    this.subscription?.unsubscribe();
  }

  loadPokemon() {
    const loadedPokemon = environment.pokemonModelList.find(p => p.id.toString() === this.id || p.name === this.id);

    if (loadedPokemon) {
      this.pokemon = loadedPokemon;
      return;
    }

    this.pokedexService.getPokemonById(this.id).subscribe({
      next: (value) => {
        this.pokemon = value;
      }
    })
  }

  getCardBgColor(): string {
    if (!this.pokemon)
      return '';

    return this.pokemon.types.map(typeSlot => `type-${typeSlot.type.name}-light`)[0];
  }

  getChipBgColor(type: NameUrl): string {
    return `type-${type.name}`;
  }

  formatNumberWithLeadingZeros() {
    if (!this.pokemon)
      return '';

    const numAsString = this.pokemon.id.toString();
    if (numAsString.length > 3) {
      return '#' + numAsString;
    } else {
      return '#' + numAsString.padStart(3, '0');
    }
  }

  goToNext() {
    this.router.navigateByUrl('/pokemon/' + (this.pokemon!.id + 1));
  }

  goToPrev() {
    this.router.navigateByUrl('/pokemon/' + (this.pokemon!.id - 1));
  }

}
