import { NameUrl } from "./NameUrl"

export interface PokemonModel {
  id: number,
  name: string,
  types: TypeSlot[],
  moves: MoveSlot[],
  sprites: {
    other: {
      'official-artwork'?: {
        front_default: string
      }
    }
  },
  stats: Stats[],
}

export interface TypeSlot {
  slot: number,
  type: NameUrl
}

export interface MoveSlot {
  move: NameUrl,
  levelLearned?: number
}

export interface Stats {
  base_stat: number,
  effort: number,
  stat: NameUrl
}
