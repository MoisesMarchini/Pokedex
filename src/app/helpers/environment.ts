import { PokemonModel } from '../models/pokemon';
import { NameUrl } from '../models/NameUrl';
import { MovesetModel } from '../models/moveset';
export const environment = {
  BASEAPIURL: 'https://pokeapi.co/api/v2/',
  pokemonModelList: [] as PokemonModel[],
  movesetModelList: [] as MovesetModel[],
  pokemonList: [] as NameUrl[],
  searchText: '',
  hideSearchBar: false,
}
