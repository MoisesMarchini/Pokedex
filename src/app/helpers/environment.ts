import { PokemonModel } from '../models/pokemon';
import { PokemonList } from '../models/pokemonList';
export const environment = {
  BASEAPIURL: 'https://pokeapi.co/api/v2/',
  pokemonModelList: [] as PokemonModel[],
  pokemonList: [] as PokemonList[],
  searchText: '',
}
