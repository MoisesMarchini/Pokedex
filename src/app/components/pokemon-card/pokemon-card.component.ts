import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/app/helpers/environment';
import { PokemonModel, Type } from 'src/app/models/pokemon';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon?: PokemonModel;
  @Input() pokemonUrl?: string;

  loaded = false;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
    if (this.pokemon){
      this.loaded = true;
      return;
    }

    if (!this.pokemon && this.pokemonUrl) {

      const urlSplit = this.pokemonUrl.split('/');
      const urlId = parseInt(urlSplit[urlSplit.length - 2])
      const fetchedPkm = environment.pokemonModelList.find(p => p.id === urlId);

      if (fetchedPkm) {
        this.pokemon = fetchedPkm;
        this.loaded = true;
        return;
      }

      this.pokedexService.getByUrl(this.pokemonUrl).subscribe({
        next: (pkm) => {
          this.pokemon = pkm;
          this.loaded = true;
        }
      })
    }
  }

  getCardBgColor(): string {
    if (!this.pokemon)
      return '';

    return this.pokemon.types.map(typeSlot => `type-${typeSlot.type.name}-light`)[0];
  }

  getChipBgColor(type: Type): string {
    return `type-${type.name}`;
  }

  formatNumberWithLeadingZeros(num: number, length: number = 3) {
    const numAsString = num.toString();
    if (numAsString.length > length) {
      return '#' + numAsString;
    } else {
      return '#' + numAsString.padStart(length, '0');
    }
  }

}
