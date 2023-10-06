import Character from "@/model/character";
import { convertCharacterDto } from "@/model/mapper/character-mapper";
import { CharacterDto } from "fm-transfer-model";

export default async function fetchCharacterList(): Promise<Character[]> {
  return fetch(process.env.BACKEND_URL + "/characters", {
    next: { revalidate: 120 },
  })
    .then((res) => res.json())
    .then((dtos: CharacterDto[]) => dtos.map(convertCharacterDto));
}
