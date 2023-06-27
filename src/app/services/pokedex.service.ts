import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../helpers/environment';
import { Observable, map } from 'rxjs';
import { MoveSlot, PokemonModel } from '../models/pokemon';
import { NameUrl } from '../models/NameUrl';
import { MovesetModel } from '../models/moveset';

const BASE_APIURL = environment.BASEAPIURL;
const GET_POKEMONROUTE = 'pokemon/';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private httpClient: HttpClient) { }

  getPokemonById(pokemonId: number | string): Observable<PokemonModel> {
    return this.httpClient.get<PokemonModel>(BASE_APIURL + GET_POKEMONROUTE + pokemonId).pipe(
      map((result: any) => {
        const convertedResult: PokemonModel = result;
        const convertedMoveset: MoveSlot[] = [];
        result.moves.forEach((moveset: any, index: number) => {
          const movelearntByLevel = moveset.version_group_details.find((p: any) => p.move_learn_method.name === 'level-up');
          if(movelearntByLevel)
            convertedMoveset.push({
              move: moveset.move,
              levelLearned: movelearntByLevel.level_learned_at ?? undefined
            })
        });
        convertedResult.moves = convertedMoveset.sort((n1, n2) => {
          if (n1.levelLearned && n2.levelLearned){
            return n1.levelLearned - n2.levelLearned;
          }

          return 0;
        });
        const listHasPokemon = environment.pokemonModelList.some(pkm => pkm.id === convertedResult.id);
        if (!listHasPokemon)
          environment.pokemonModelList.push(convertedResult);

        return convertedResult;
      })
    );
  }

  getPokemonByUrl(pokemonUrl: string): Observable<PokemonModel> {
    return this.httpClient.get<PokemonModel>(pokemonUrl).pipe(
      map((result: any) => {
        const convertedResult: PokemonModel = result;
        const convertedMoveset: MoveSlot[] = [];
        result.moves.forEach((moveset: any, index: number) => {
          const movelearntByLevel = moveset.version_group_details.find((p: any) => p.move_learn_method.name === 'level-up');
          if(movelearntByLevel)
            convertedMoveset.push({
              move: moveset.move,
              levelLearned: movelearntByLevel.level_learned_at ?? undefined
            })
        });
        convertedResult.moves = convertedMoveset.sort((n1, n2) => {
          if (n1.levelLearned && n2.levelLearned){
            return n1.levelLearned - n2.levelLearned;
          }

          return 0;
        });
        const listHasPokemon = environment.pokemonModelList.some(pkm => pkm.id === convertedResult.id);
        if (!listHasPokemon)
          environment.pokemonModelList.push(convertedResult);

        return convertedResult;
      })
    );
  }

  getPokemonListByType(type: string): Observable<NameUrl[]> {
    return this.httpClient.get<NameUrl[]>(BASE_APIURL + 'type/' + type).pipe(
      map((result: any) => {
        return result.pokemon.map((p: any) => p.pokemon) as NameUrl[];
      })
    );
  }

  getPokemonListByMove(move: string): Observable<NameUrl[]> {
    return this.httpClient.get<NameUrl[]>(BASE_APIURL + 'move/' + move).pipe(
      map((result: any) => {
        return result.learned_by_pokemon as NameUrl[];
      })
    );
  }

  getAllPokemonList(): Observable<NameUrl[]> {
    const GET_MANYROUTE = `pokemon?limit=${100000}&offset=${0}`;
    return this.httpClient.get<NameUrl[]>(BASE_APIURL + GET_MANYROUTE).pipe(
      map((result: any) => {
        return result.results as NameUrl[];
      })
    );
  }


  getMovesetById(moveId: number | string): Observable<MovesetModel> {
    return this.httpClient.get<MovesetModel>(BASE_APIURL + 'move/' + moveId).pipe(
      map((result) => {
        const listHasMove = environment.movesetModelList.some(move => move.id === result.id);
        if (!listHasMove)
          environment.movesetModelList.push(result);

        return result;
      })
    );
  }

  getMovesetByUrl(pokemonUrl: string): Observable<MovesetModel> {
    return this.httpClient.get<MovesetModel>(pokemonUrl).pipe(
      map((result) => {
        const listHasMove = environment.movesetModelList.some(pkm => pkm.id === result.id);
        if (!listHasMove)
          environment.movesetModelList.push(result);

        return result;
      })
    );
  }

}
