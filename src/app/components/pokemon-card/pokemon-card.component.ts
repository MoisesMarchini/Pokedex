import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/app/helpers/environment';
import { GlobalFunctions } from 'src/app/helpers/globalFunctions';
import { NameUrl } from 'src/app/models/NameUrl';
import { PokemonModel } from 'src/app/models/pokemon';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon?: PokemonModel;
  @Input() pokemonUrl?: string;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
    if (this.pokemon)
      return;

    if (!this.pokemon && this.pokemonUrl) {

      const urlSplit = this.pokemonUrl.split('/');
      const urlId = parseInt(urlSplit[urlSplit.length - 2])
      const fetchedPkm = environment.pokemonModelList.find(p => p.id === urlId);

      if (fetchedPkm) {
        this.pokemon = fetchedPkm;
        return;
      }

      this.pokedexService.getPokemonByUrl(this.pokemonUrl).subscribe({
        next: (pkm) => {
          this.pokemon = pkm;
        }
      })
    }
  }

  getCardBgColor(): string {
    if (!this.pokemon)
      return '';

    return GlobalFunctions.getCardBgColor(this.pokemon);
  }

  getChipBgColor(type: NameUrl): string {
    return GlobalFunctions.getChipBgColor(type);
  }

  formatNumberWithLeadingZeros() {
    if (!this.pokemon)
      return '';

    return GlobalFunctions.formatNumberWithLeadingZeros(this.pokemon.id);
  }

  getTranslatedType(type: string) {
    return GlobalFunctions.getTranslatedType(type);
  }

}
