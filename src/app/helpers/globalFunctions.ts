import { NameUrl } from "../models/NameUrl";
import { PokemonModel } from "../models/pokemon";

export class GlobalFunctions {
  static getTranslatedType(type: string) {
    const typesEN = [
      'grass',
      'fire',
      'water',
      'normal',
      'flying',
      'bug',
      'poison',
      'electric',
      'ground',
      'fighting',
      'psychic',
      'rock',
      'ice',
      'ghost',
      'dragon',
      'dark',
      'steel',
      'fairy',
    ];
    const typesBR = [
      'planta',
      'fogo',
      'água',
      'normal',
      'voador',
      'inseto',
      'veneno',
      'elétrico',
      'terra',
      'lutador',
      'psíquico',
      'pedra',
      'gelo',
      'fantasma',
      'dragão',
      'sombrio',
      'metal',
      'fada',
    ];

    return typesBR[typesEN.findIndex(p => p === type.toLowerCase())];
  }

  static getCardBgColor(pokemon: PokemonModel): string {
    return pokemon.types.map(typeSlot => `type-${typeSlot.type.name}-light`)[0];
  }

  static getChipBgColor(type: NameUrl): string {
    return `type-${type.name}`;
  }

  static formatNumberWithLeadingZeros(id: number | string) {
    const numAsString = id.toString();
    if (numAsString.length > 3) {
      return numAsString;
    } else {
      return numAsString.padStart(3, '0');
    }
  }
}
