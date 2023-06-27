import { NameUrl } from "./NameUrl";

export interface MovesetModel {
  id: number,
  name: string,
  pp?: number,
  power?: number;
  accuracy?: number,
  damage_class: NameUrl,
  learned_by_pokemon: NameUrl[]
}
