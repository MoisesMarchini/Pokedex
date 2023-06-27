export interface PokemonModel {
  id: number,
  name: string,
  types: TypeSlot[],
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
  type: Type
}

export interface Type {
  name: string,
  url: string
}

export interface Stats {
  base_stat: number,
  effort: number,
  stat: Type
}
