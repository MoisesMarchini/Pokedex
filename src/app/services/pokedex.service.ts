import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../helpers/environment';
import { Observable, map } from 'rxjs';
import { PokemonModel } from '../models/pokemon';
import { PokemonList } from '../models/pokemonList';

const BASE_APIURL = environment.BASEAPIURL;
const GET_POKEMONROUTE = 'pokemon/';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private httpClient: HttpClient) { }

  getById(pokemonId: number | string): Observable<PokemonModel> {
    return this.httpClient.get<PokemonModel>(BASE_APIURL + GET_POKEMONROUTE + pokemonId).pipe(
      map((result) => {
        const listHasPokemon = environment.pokemonModelList.some(pkm => pkm.id === result.id);
        if (!listHasPokemon)
          environment.pokemonModelList.push(result);

        return result;
      })
    );
  }

  getByUrl(pokemonUrl: string): Observable<PokemonModel> {
    return this.httpClient.get<PokemonModel>(pokemonUrl).pipe(
      map((result) => {
        const listHasPokemon = environment.pokemonModelList.some(pkm => pkm.id === result.id);
        if (!listHasPokemon)
          environment.pokemonModelList.push(result);

        return result;
      })
    );
  }

  getMany(): Observable<PokemonList[]> {
    const GET_MANYROUTE = `pokemon?limit=${100000}&offset=${0}`;
    return this.httpClient.get<PokemonList[]>(BASE_APIURL + GET_MANYROUTE).pipe(
      map((result: any) => {
        return result.results as PokemonList[];
      })
    );
  }

  getByType(type: string): Observable<PokemonList[]> {
    return this.httpClient.get<PokemonList[]>(BASE_APIURL + 'type/' + type).pipe(
      map((result: any) => {
        return result.pokemon.map((p: any) => p.pokemon) as PokemonList[];
      })
    );
  }

}
